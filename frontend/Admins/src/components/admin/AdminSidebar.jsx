import { Link, Outlet, useLocation } from "react-router-dom"
import { useSidebarContext } from "../../contexts/SidebarContext.jsx"

const AdminSidebar = () => {
    const location = useLocation();
    const { isSidebarOpen } = useSidebarContext();

    function logOut() {
        localStorage.clear()
        window.location.href = import.meta.env.VITE_LOGIN_REDIRECT_URL + "?logout=true"
    }

    const navItems = [
        { path: "/admin/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { path: "/admin/user-management", label: "User Management", icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" },
        { path: "/admin/listing-moderation", label: "Listing Moderation", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
        { path: "/admin/transactions", label: "Transactions", icon: "M17 9V7a4 4 0 00-8 0v2m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2z" },
        { path: "/admin/reports-and-analytics", label: "Reports & Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
        { path: "/admin/support-resolution", label: "Support / Disputes", icon: "M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 11-1.414-1.414 1 1 0 011.414 1.414z" },
        { path: "/admin/notifications", label: "Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
        { path: "#", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
    ];

    return (
        <>
            <div className="flex">
                {/* <!-- SHARED SIDEBAR COMPONENT (ADMIN) --> */}
                <aside className={`h-screen bg-slate-900 flex flex-col shrink-0 transition-all duration-300 ease-in-out border-r border-slate-800 ${isSidebarOpen ? "w-64" : "w-20"}`}>
                    <div className={`h-16 flex items-center border-b border-slate-800 whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? "px-6" : "px-0 justify-center"}`}>
                        <span className={`font-bold text-white transition-all duration-300 ${isSidebarOpen ? "text-xl opacity-100" : "text-2xl opacity-100"}`}>
                            {isSidebarOpen ? "WasteXchange" : "WX"}
                        </span>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 overflow-x-hidden">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link 
                                    key={item.label}
                                    to={item.path}
                                    className={`flex items-center rounded-lg font-medium text-sm transition-all duration-300 ${isSidebarOpen ? "gap-3 px-3 py-2.5" : "justify-center py-2.5"} ${isActive ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                                    title={!isSidebarOpen ? item.label : ""}
                                >
                                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
                                    </svg>
                                    <span className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-slate-800 p-3">
                        <button onClick={logOut}
                                className={`w-full flex items-center rounded-lg font-medium text-sm transition-all duration-300 text-slate-400 hover:bg-red-500/10 hover:text-red-400 ${isSidebarOpen ? "gap-3 px-3 py-2.5" : "justify-center py-2.5"}`}
                                title={!isSidebarOpen ? "Logout" : ""}
                        >
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
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

export default AdminSidebar
