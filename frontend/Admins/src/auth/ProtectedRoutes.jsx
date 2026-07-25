import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading.jsx";
import { useVerifyUser } from "../hooks/useVerifyUser.jsx";

const ProtectedRoutes = () => {
    const { user, loading, token } = useVerifyUser();

    if (!token) return <Navigate to="/" />

    if (loading) return <Loading />

    return user?.message ? <Navigate to="/" /> : <Outlet />
}
export default ProtectedRoutes
