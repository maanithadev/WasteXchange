import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export function useVerifyUser() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token") || null

    useEffect(() => {
        async function fetchUser() {
            try {
                if (token !== null) {
                    setLoading(true)
                    const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_VERIFY_USER_HOOK_URL, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setUser(res.data)
                    setLoading(false)
                }
            } catch (err) {
                console.log(err.message)
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return { user, loading, token }
}