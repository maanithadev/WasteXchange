import {Navigate, Outlet} from "react-router-dom";
import Loading from "../components/Loading.jsx";
import {useVerifyUser} from "../hooks/useVerifyUser.jsx";

const ProtectedAdminRoutes = () => {
    const {user, loading, token} = useVerifyUser();

    if (!token) return <Navigate to="/"/>

    if (loading) return <Loading/>

    return user ? <Outlet/> : <Navigate to="/"/>
}
export default ProtectedAdminRoutes
