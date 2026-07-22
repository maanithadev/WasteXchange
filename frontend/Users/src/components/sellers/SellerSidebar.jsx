import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSidebarContext } from "../../contexts/SidebarContext.jsx";
import { useEffect } from "react";
import toast from 'react-hot-toast';

const SellerSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();

    // Automatically collapse sidebar on small screens (e.g. mobile)
    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname, setIsSidebarOpen]);

    function logOut() {
        localStorage.clear()
        navigate("/login")
        toast.success('Logged out successfully!')
    }

    const navItems = [
        { path: "/seller/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { path: "/seller/upload-waste", label: "Upload Waste", icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" },
        { path: "/seller/my-listings", label: "My Listings", icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" },
        { path: "/seller/listing-matches", label: "Listing Status / Matches", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { path: "/seller/orders-received", label: "Orders Received", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
        { path: "/seller/messages", label: "Messages", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
        { path: "/seller/carbon-footprint", label: "Carbon Footprint", icon: "M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" },
        { path: "/seller/payments", label: "Payments / Earnings", icon: "M17 9V7a4 4 0 00-8 0v2m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2z" },
        { path: "/seller/settings", label: "Profile / Settings", icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    return (
        <>
            <div className="flex">
                {/* <!-- SHARED SIDEBAR COMPONENT --> */}
                <aside className={`h-screen bg-white border-slate-200 flex flex-col shrink-0 transition-all duration-300 ease-in-out border-r ${isSidebarOpen ? "w-64" : "w-20"}`}>
                    <div className={`h-16 flex items-center border-b border-slate-200 whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? "px-6" : "px-0 justify-center"}`}>
                        <span className={`font-bold text-emerald-700 transition-all duration-300 ${isSidebarOpen ? "text-xl opacity-100" : "text-2xl opacity-100"}`}>
                            {isSidebarOpen ? "WasteXchange" : "WX"}
                        </span>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 overflow-x-hidden">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center rounded-lg font-medium text-sm transition-all duration-300 ${isSidebarOpen ? "gap-3 px-3 py-2.5" : "justify-center py-2.5"} ${isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
                                    title={!isSidebarOpen ? item.label : ""}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                    </svg>
                                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-slate-200 p-3">
                        <button onClick={logOut}
                            className={`w-full flex items-center rounded-lg font-medium text-sm transition-all duration-300 text-slate-600 hover:bg-red-50 hover:text-red-600 ${isSidebarOpen ? "gap-3 px-3 py-2.5" : "justify-center py-2.5"}`}
                            title={!isSidebarOpen ? "Logout" : ""}
                        >
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                                Logout
                            </span>
                        </button>
                    </div>
                </aside>

                <div className="w-full h-screen overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default SellerSidebar
