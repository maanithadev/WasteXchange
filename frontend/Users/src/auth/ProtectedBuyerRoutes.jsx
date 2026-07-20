import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { useVerifyUser } from "../hooks/useVerifyUser.jsx";

const ProtectedBuyerRoutes = () => {
    const { user, loading, token } = useVerifyUser();

    if (!token) return <Navigate to="/login" />

    if (loading) return <Loading />

    return user?.role === "buyer" ? <Outlet /> : <Navigate to="/login" />
}
export default ProtectedBuyerRoutes
