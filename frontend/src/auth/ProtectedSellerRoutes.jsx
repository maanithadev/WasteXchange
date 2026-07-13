import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../components/Loading.jsx";

const ProtectedSellerRoutes = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login"/>

    useEffect(() => {
        async function verifySeller() {
            try {
                const res = await axios.get("http://localhost:3000/api/users/verifyUser", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUser(res.data.role)
                setLoading(false)
            } catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        }

        verifySeller()
    }, []);

    if (loading) return <Loading/>

    return user === "seller" ? <Outlet/> : <Navigate to="/login"/>
}
export default ProtectedSellerRoutes
