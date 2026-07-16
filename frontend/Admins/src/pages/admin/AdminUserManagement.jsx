import { useEffect, useState } from "react"
import axios from "axios"

const AdminUserManagement = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://localhost:3000/api/users/get-all-users", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(res.data)
            setFilteredData(res.data)
        }
        fetchData()
    }, [refresh])

    function handleUser(option) {
        switch (option) {
            case "all":
                setFilteredData(data)
                break;
            case "seller":
                setFilteredData(data.filter((user) => user.role === "seller"))
                break;
            case "buyer":
                setFilteredData(data.filter((user) => user.role === "buyer"))
                break;
            case "suspended":
                setFilteredData(data.filter((user) => user.status === "suspended"))
                break;
            default:
                setFilteredData(data)
                break;
        }
    }

    async function handleSuspend(id) {
        try {
            const res = await axios.put(`http://localhost:3000/api/users/update-user-status`,
                { user_id: id },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setRefresh(!refresh)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            {/* <!-- USER MANAGEMENT PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">User Management</h1>
                    <p class="text-sm text-slate-500 mt-1">Manage sellers, buyers, and account status</p>
                </div>

                {/* <!-- Filter tabs + search --> */}
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div class="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit">
                        <button onClick={() => handleUser("all")} class="text-xs font-semibold px-3 py-1.5 rounded-md bg-indigo-600 text-white">All</button>
                        <button onClick={() => handleUser("seller")} class="text-xs font-semibold px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50">Sellers</button>
                        <button onClick={() => handleUser("buyer")} class="text-xs font-semibold px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50">Buyers</button>
                        <button onClick={() => handleUser("suspended")} class="text-xs font-semibold px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50">Suspended</button>
                    </div>
                    <input type="text" placeholder="Search users..." class="w-full sm:w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Name</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Email</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Role</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Join Date</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {filteredData.map((item, index) => (
                                    <tr>
                                        <td class="px-6 py-3.5 font-medium text-slate-800">{item.company_name}</td>
                                        <td class="px-6 py-3.5 text-slate-500">{item.email}</td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{item.role}</span></td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{item.status}</span></td>
                                        <td class="px-6 py-3.5 text-slate-500">{item.created_at}</td>
                                        <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                            <button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View</button>
                                            <button onClick={() => handleSuspend(item._id)} class="text-xs font-medium border border-red-200 text-red-600 rounded-md px-2.5 py-1 hover:bg-red-50">Suspend</button>
                                        </td>
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

export default AdminUserManagement
