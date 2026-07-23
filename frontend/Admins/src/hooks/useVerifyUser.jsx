import { useEffect, useState } from "react";
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
                setLoading(false)
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }

        verifyUser()
    }, [token]);

    return { user, loading, token }
}