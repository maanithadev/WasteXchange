import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../components/Loading.jsx";

const ProtectedBuyerRoutes = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login"/>

    useEffect(() => {
        async function verifyBuyer() {
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

        verifyBuyer()
    }, []);

    if (loading) return <Loading/>

    return user === "buyer" ? <Outlet/> : <Navigate to="/login"/>
}
export default ProtectedBuyerRoutes
