import { Link, Navigate, Outlet } from "react-router-dom";
import { useVerifyUser } from "../../hooks/useVerifyUser.jsx";

const GuestsNavbar = () => {
    const { user } = useVerifyUser()

    function displayBtns() {
        switch (user?.role) {
            case "seller":
                return (
                    <Link to="/seller/dashboard"
                        class="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Dashboard</Link>
                )
            case "buyer":
                return (
                    <Link to="/buyer/dashboard"
                        class="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Dashboard</Link>
                )
            case "admin":
                return (
                    <button onClick={() => window.location.href = import.meta.env.VITE_ADMIN_DASHBOARD_URL}
                        class="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Dashboard</button>
                )
            default:
                return (
                    <>
                        <Link to="/login"
                            class="text-sm font-medium text-slate-700 border border-slate-300 rounded-lg px-4 py-2 hover:bg-slate-50">Login</Link>
                        <Link to="/signup"
                            class="text-sm font-medium text-white bg-emerald-600 rounded-lg px-4 py-2 hover:bg-emerald-700">Sign
                            Up</Link>
                    </>
                )
        }
    }

    return (
        <>
            {/* <!-- PUBLIC NAVBAR (GUEST) --> */}
            <header
                class="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10">
                <div class="flex items-center gap-10">
                    <span class="text-xl font-bold text-emerald-700">WasteXchange</span>

                    <nav class="hidden md:flex items-center gap-8">
                        <Link to="/" class="text-sm font-medium text-slate-900">Home</Link>
                        <Link to="/browse-marketplace" class="text-sm font-medium text-slate-600 hover:text-slate-900">Browse
                            Marketplace</Link>
                        <Link to="#" class="text-sm font-medium text-slate-600 hover:text-slate-900">How It Works</Link>
                        <Link to="/about" class="text-sm font-medium text-slate-600 hover:text-slate-900">About</Link>
                        <Link to="/contact"
                            class="text-sm font-medium text-slate-600 hover:text-slate-900">Contact</Link>
                    </nav>
                </div>

                <div class="flex items-center gap-3">
                    {displayBtns()}
                </div>
            </header>

            <Outlet />
        </>
    )
}

export default GuestsNavbar
