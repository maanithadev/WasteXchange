import {useVerifyUser} from "../hooks/useVerifyUser.jsx";
import {Navigate, Outlet} from "react-router-dom";
import Loading from "../components/Loading.jsx";

const ProtectedAdminRoutes = () => {
    const {user, loading} = useVerifyUser()

    if (loading) return <Loading/>

    return user?.role === "admin" || user?.role === "manager" ? <Outlet/> : <Navigate to="/"/>
}
export default ProtectedAdminRoutes
