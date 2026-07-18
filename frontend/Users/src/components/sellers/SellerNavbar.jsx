import { Outlet } from "react-router-dom";
import { useSidebarContext } from "../../contexts/SidebarContext.jsx";

const SellerNavbar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
    return (
        <>
            {/* <!-- SHARED NAVBAR / TOPBAR COMPONENT --> */}
            <header className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <span className="text-xs font-medium text-slate-400 border-l border-slate-200 pl-2 ml-1">Seller Portal</span>
                </div>

                <div className="flex items-center gap-5">
                    {/* <!-- Notification bell --> */}
                    <button className="relative text-slate-500 hover:text-slate-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span
                            className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">3</span>
                    </button>

                    {/* <!-- Messages --> */}
                    <button className="relative text-slate-500 hover:text-slate-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span
                            className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-emerald-500 text-white text-[10px] font-bold">5</span>
                    </button>

                    {/* <!-- Profile dropdown trigger (static, closed state) --> */}
                    <button className="flex items-center gap-2 pl-3 border-l border-slate-200">
                        <img src="https://placehold.co/32x32" className="w-8 h-8 rounded-full object-cover"
                            alt="User avatar" />
                        <span className="text-sm font-medium text-slate-700">Green Metals Co.</span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default SellerNavbar
