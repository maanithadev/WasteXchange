import { Outlet } from "react-router-dom"
import { useSidebarContext } from "../../contexts/SidebarContext.jsx"
import {useVerifyUser} from "../../hooks/useVerifyUser.jsx";
import Loading from "../Loading.jsx";

const AdminNavbar = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
    const {user, loading} = useVerifyUser();
    if (loading) return <Loading />;

    return (
        <>
            {/* <!-- SHARED NAVBAR / TOPBAR COMPONENT (ADMIN) --> */}
            <header className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full ml-1 capitalize">{user.role} Panel</span>
                </div>

                {/* <div className="flex items-center gap-5">
                    <button className="relative text-slate-500 hover:text-slate-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">7</span>
                    </button>

                    <button className="flex items-center gap-2 pl-3 border-l border-slate-200">
                        <img src="https://placehold.co/32x32" className="w-8 h-8 rounded-full object-cover" alt="Admin avatar" />
                        <div className="flex flex-col items-start">
                            <span className="text-sm font-medium text-slate-700 leading-tight">Alex Rivera</span>
                            <span className="text-[10px] font-semibold text-indigo-600 leading-tight">Admin</span>
                        </div>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div> */}
            </header>

            <Outlet />
        </>
    )
}

export default AdminNavbar
