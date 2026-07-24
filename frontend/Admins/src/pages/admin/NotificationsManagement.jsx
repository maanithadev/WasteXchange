import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const NotificationsManagement = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_ALL_ADMIN_ANNOUNCEMENTS_URL, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setData(res.data)
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }

        fetchData()
    }, [refresh])

    async function onsubmit(formData) {
        try {
            const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_ADMIN_ANNOUNCEMENT_SENT_URL,
                { formData },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            setRefresh(!refresh)
            toast.success("Announcement sent successfully!")
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                toast.error("Too many requests, please try again later.")
            } else {
                toast.error('Something went wrong! Please try again later.')
            }
        }
    }

    return (
        <>
            {/* <!-- NOTIFICATIONS MANAGEMENT PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Notifications Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Compose and send platform-wide announcements</p>
                </div>

                {/* <!-- Compose form --> */}
                <form className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 mb-8 max-w-2xl">
                    <h2 className="text-sm font-semibold text-slate-900">New Announcement</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                        <input type="text" {...register("title", { required: "Title is Required" })} placeholder="Announcement title"
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        {errors.title && <p className="text-red-600 font-medium">{errors.title?.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                        <textarea rows="4" {...register("message", { required: "Message is Required" })} placeholder="Write your announcement..."
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                        {errors.message && <p className="text-red-600 font-medium">{errors.message?.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                        <select {...register("target_audience", { required: "Target Audience is Required" })}
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="all">All Users</option>
                            <option value="sellers">Sellers Only</option>
                            <option value="buyers">Buyers Only</option>
                        </select>
                        {errors.target_audience && <p className="text-red-600 font-medium">{errors.target_audience?.message}</p>}
                    </div>

                    <button type="button" onClick={handleSubmit(onsubmit)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">Send
                        Notification
                    </button>
                </form>

                {/* <!-- History table --> */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h2 className="text-sm font-semibold text-slate-900">Notification History</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Title</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Message</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Audience</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Sent
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-3.5 font-medium text-slate-800 capitalize">{item.title}</td>
                                        <td className="px-6 py-3.5 font-medium text-slate-800 capitalize">{item.message}</td>
                                        <td className="px-6 py-3.5"><span
                                            className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">{item.audience}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-slate-500">{item.send_date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default NotificationsManagement
