import {Navigate, Outlet} from "react-router-dom";
import Loading from "../components/Loading.jsx";
import {useVerifyUser} from "../hooks/useVerifyUser.jsx";

const ProtectedSellerRoutes = () => {
    const {user, loading, token} = useVerifyUser();

    if (!token) return <Navigate to="/login"/>

    if (loading) return <Loading/>

    return user?.role === "seller" ? <Outlet/> : <Navigate to="/login"/>
}
export default ProtectedSellerRoutes
