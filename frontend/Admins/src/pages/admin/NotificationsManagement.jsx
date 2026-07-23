import {useForm} from "react-hook-form"
import axios from "axios"
import {useEffect, useState} from "react"
import toast from "react-hot-toast"

const NotificationsManagement = () => {
    const {register, handleSubmit} = useForm()
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_ALL_ADMIN_ANNOUNCEMENTS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(res.data)
        }

        fetchData()
    }, [refresh])

    async function onsubmit(formData) {
        const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_ADMIN_ANNOUNCEMENT_SENT_URL,
            {formData},
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        setRefresh(!refresh)
        toast.success("Announcement sent successfully!")
    }


    return (
        <>
            {/* <!-- NOTIFICATIONS MANAGEMENT PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Notifications Management</h1>
                    <p class="text-sm text-slate-500 mt-1">Compose and send platform-wide announcements</p>
                </div>

                {/* <!-- Compose form --> */}
                <form class="bg-white rounded-xl border border-slate-200 p-6 space-y-5 mb-8 max-w-2xl">
                    <h2 class="text-sm font-semibold text-slate-900">New Announcement</h2>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Title</label>
                        <input type="text" {...register("title")} placeholder="Announcement title"
                               class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Message</label>
                        <textarea rows="4" {...register("message")} placeholder="Write your announcement..."
                                  class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                        <select {...register("target_audience")}
                                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="all">All Users</option>
                            <option value="sellers">Sellers Only</option>
                            <option value="buyers">Buyers Only</option>
                        </select>
                    </div>

                    <button type="button" onClick={handleSubmit(onsubmit)}
                            class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">Send
                        Notification
                    </button>
                </form>

                {/* <!-- History table --> */}
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-200">
                        <h2 class="text-sm font-semibold text-slate-900">Notification History</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                            <tr class="bg-slate-50 border-b border-slate-200">
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Title</th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Message</th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Audience</th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Sent
                                    Date
                                </th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td class="px-6 py-3.5 font-medium text-slate-800 capitalize">{item.title}</td>
                                    <td class="px-6 py-3.5 font-medium text-slate-800 capitalize">{item.message}</td>
                                    <td class="px-6 py-3.5"><span
                                        class="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">{item.audience}</span>
                                    </td>
                                    <td class="px-6 py-3.5 text-slate-500">{item.send_date}</td>
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
