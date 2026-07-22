import {useEffect, useState} from "react";
import axios from "axios";

export function useVerifyUser() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token") || null

    useEffect(() => {
        async function verifyUser() {
            try {
                if (token !== null) {
                    const res = await axios.get(import.meta.env.VITE_ADMIN_BACKEND_URL + import.meta.env.VITE_VERIFY_USER_HOOK_URL, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUser(res.data)
                    setLoading(false)
                } else {
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        }

        verifyUser()
    }, [token]);

    return {user, loading, token}
}