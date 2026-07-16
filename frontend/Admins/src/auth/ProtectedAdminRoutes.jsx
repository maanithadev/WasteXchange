import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { useVerifyUser } from "../hooks/useVerifyUser.jsx";

const ProtectedAdminRoutes = () => {
    const { user, loading, token } = useVerifyUser();

    useEffect(() => {
        if (!loading) {
            if (!token || user?.role !== "admin") {
                window.location.href = "http://localhost:5173/login";
            }
        }
    }, [loading, token, user]);

    if (loading) return <Loading />

    if (!token || user?.role !== "admin") return null;

    return <Outlet />
}
export default ProtectedAdminRoutes
