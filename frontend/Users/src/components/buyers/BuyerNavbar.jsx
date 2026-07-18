import { Outlet } from "react-router-dom";
import { useSidebarContext } from "../../contexts/SidebarContext.jsx";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const BuyerNavbar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const notificationsRef = useRef(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_GET_SPECIFIC_USER_NOTIFICATIONS_URL, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setNotifications(response.data);
            } catch (err) {
                console.error("Failed to fetch notifications:", err);
            }
        };

        fetchNotifications();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleNotificationsToggle = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
    };

    const handleMarkAsRead = async (id, isRead) => {
        if (isRead) return;
        try {
            await axios.get(`${import.meta.env.VITE_MARK_NOTIFICATION_READ_URL}${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
        } catch (err) {
            console.error("Failed to mark notification as read:", err);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await axios.get(import.meta.env.VITE_MARK_ALL_NOTIFICATIONS_READ_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        } catch (err) {
            console.error("Failed to mark all notifications as read:", err);
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <>
            {/* <!-- SHARED NAVBAR / TOPBAR COMPONENT (BUYER) --> */}
            <header className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <span className="text-xs font-medium text-slate-400 border-l border-slate-200 pl-2 ml-1">Buyer Portal</span>
                </div>

                <div className="flex items-center gap-5 relative">
                    {/* notifications */}
                    <div className="relative top-1" ref={notificationsRef}>
                        <button
                            className="relative text-slate-500 hover:text-slate-700 focus:outline-none"
                            onClick={handleNotificationsToggle}
                            aria-label="Toggle notifications"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
                                {unreadCount > 0 ? unreadCount : "0"}
                            </span>
                        </button>

                        {isNotificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-slate-100 z-50 overflow-hidden">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                    <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
                                    {unreadCount > 0 && (
                                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                                            {unreadCount} New
                                        </span>
                                    )}
                                </div>
                                <div className="max-h-[320px] overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification, index) => (
                                            <div
                                                key={index}
                                                className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors group cursor-pointer"
                                                onClick={() => handleMarkAsRead(notification._id, notification.isRead)}
                                            >
                                                <div className="flex gap-3">
                                                    {notification.isRead
                                                        ? null
                                                        : <div className="flex-shrink-0 mt-0.5">
                                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 group-hover:bg-blue-600 transition-colors"></div>
                                                        </div>}
                                                    <div className="flex-1 min-w-0">
                                                        {notification.title && <p className="text-sm font-medium text-slate-800 mb-0.5 truncate">{notification.title}</p>}
                                                        <p className="text-sm text-slate-600 leading-snug">{notification.message || "New notification"}</p>
                                                        {notification.created_at && (
                                                            <p className="text-[11px] text-slate-400 mt-2 font-medium">
                                                                {new Date(notification.created_at).toLocaleString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                                            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                                                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">No new notifications</p>
                                            <p className="text-xs text-slate-500 mt-1">We'll let you know when something arrives.</p>
                                        </div>
                                    )}
                                </div>
                                {unreadCount > 0 && (
                                    <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center hover:bg-slate-100 transition-colors">
                                        <button
                                            className="text-xs text-blue-600 hover:text-blue-700 font-semibold w-full focus:outline-none"
                                            onClick={handleMarkAllAsRead}
                                        >
                                            Mark all as read
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* messages */}
                    {/* <button className="relative text-slate-500 hover:text-slate-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-blue-500 text-white text-[10px] font-bold">4</span>
                    </button> */}

                    {/* profile */}
                    {/* <button className="flex items-center gap-2 pl-3 border-l border-slate-200">
                        <img src="https://placehold.co/32x32" className="w-8 h-8 rounded-full object-cover" alt="User avatar" />
                        <span className="text-sm font-medium text-slate-700">EcoPlast Industries</span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button> */}
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default BuyerNavbar
