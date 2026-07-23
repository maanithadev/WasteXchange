import { Link, Navigate, Outlet } from "react-router-dom";
import { useVerifyUser } from "../../hooks/useVerifyUser.jsx";

const GuestsNavbar = () => {
    const { user } = useVerifyUser()

    function displayBtns() {
        switch (user?.role) {
            case "seller":
                return (
                    <Link to="/seller/dashboard"
                        className="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Dashboard</Link>
                )
            case "buyer":
                return (
                    <Link to="/buyer/dashboard"
                        className="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Dashboard</Link>
                )
            case "admin":
                return (
                    <button onClick={() => window.location.href = import.meta.env.VITE_ADMIN_FRONTEND_URL + import.meta.env.VITE_ADMIN_DASHBOARD_URL}
                        className="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Dashboard</button>
                )
            default:
                return (
                    <>
                        <Link to="/login"
                            className="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Login</Link>
                        <Link to="/signup"
                            className="text-sm font-medium text-white bg-emerald-600 rounded-lg px-4 py-2 hover:bg-emerald-700">Sign
                            Up</Link>
                    </>
                )
        }
    }

    return (
        <>
            {/* <!-- PUBLIC NAVBAR (GUEST) --> */}
            <header
                className="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10">
                <div className="flex items-center gap-10">
                    <span className="text-xl font-bold text-emerald-700">WasteXchange</span>

                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-slate-900">Home</Link>
                        <Link to="/browse-marketplace" className="text-sm font-medium text-slate-600 hover:text-slate-900">Browse
                            Marketplace</Link>
                        {/* <Link to="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">How It Works</Link> */}
                        <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-slate-900">About</Link>
                        <Link to="/contact"
                            className="text-sm font-medium text-slate-600 hover:text-slate-900">Contact</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    {displayBtns()}
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default GuestsNavbar
