import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

const BackendUsersManagement = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    const statusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-300"
            case "active":
                return "bg-emerald-200"
            case "suspend":
                return "bg-red-200"
            default:
                return null
        }
    }

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(import.meta.env.VITE_ADMIN_BACKEND_URL + import.meta.env.VITE_GET_ALL_USERS_URL, {
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
            case "admin":
                setFilteredData(data.filter((user) => user.role === "admin"))
                break;
            case "manager":
                setFilteredData(data.filter((user) => user.role === "manager"))
                break;
            case "sales":
                setFilteredData(data.filter((user) => user.role === "sales"))
                break;
            case "suspended":
                setFilteredData(data.filter((user) => user.status === "suspend"))
                break;
            default:
                setFilteredData(data)
                break;
        }

    }

    async function handleUpdateRoleAndStatus(id, newRole, newStatus) {
        try {
            await axios.put(import.meta.env.VITE_ADMIN_BACKEND_URL + import.meta.env.VITE_UPDATE_USER_ROLEANDSTATUS_URL,
                { user_id: id, role: newRole, status: newStatus },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setRefresh(!refresh)
            toast.success('Role and Status updated successful!')
            if (selectedUser) setSelectedUser(null)
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
            {/* <!-- USER MANAGEMENT PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Backend Users Management</h1>
                </div>

                {/* <!-- Filter tabs + search --> */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit">
                        <button onClick={() => handleUser("all")}
                            className="text-xs font-semibold px-3 py-1.5 rounded-md bg-indigo-600 text-white">All
                        </button>
                        <button onClick={() => handleUser("admin")}
                            className="text-xs font-semibold px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50">Admin
                        </button>
                        <button onClick={() => handleUser("manager")}
                            className="text-xs font-semibold px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50">Manager
                        </button>
                        <button onClick={() => handleUser("sales")}
                            className="text-xs font-semibold px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50">Sales
                        </button>
                        <button onClick={() => handleUser("suspended")}
                            className="text-xs font-semibold px-3 py-1.5 rounded-md text-slate-600 hover:bg-slate-50">Suspended
                        </button>
                    </div>
                    <input type="text" placeholder="Search users..."
                        className="w-full sm:w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Email</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Role</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Join
                                        Date
                                    </th>
                                    <th className="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-3.5 text-slate-500">{item.email}</td>
                                        <td className="px-6 py-3.5">
                                            <span
                                                className="text-xs font-semibold bg-emerald-200 text-black px-2 py-0.5 rounded-full capitalize">{item.role}</span>
                                        </td>
                                        <td className="px-6 py-3.5"><span
                                            className={`text-xs font-semibold text-black px-2 py-0.5 rounded-full capitalize ${statusColor(item.status)}`}>{item.status}</span>
                                        </td>
                                        <td className="px-6 py-3.5 text-slate-500">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                            <button onClick={() => setSelectedUser(item)}
                                                className="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* User Details Modal */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
                        <div
                            className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-800">User Details</h2>
                            <button onClick={() => setSelectedUser(null)}
                                className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                                    <input type="text" readOnly value={selectedUser.email || ""}
                                        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Role</label>
                                    <select
                                        value={selectedUser.role}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                                        className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                                    >
                                        <option value="need to assign">Need to Assign</option>
                                        <option value="admin">Admin</option>
                                        <option value="manager">Manager</option>
                                        <option value="sales">Sales</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Joined Date</label>
                                    <input type="text" readOnly
                                        value={new Date(selectedUser.created_at).toLocaleDateString() || ""}
                                        className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                                    <select
                                        value={selectedUser.status}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                        className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>
                                        <option value="suspend">Suspend</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                            <button onClick={() => setSelectedUser(null)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">Cancel
                            </button>
                            <button
                                onClick={() => handleUpdateRoleAndStatus(selectedUser._id, selectedUser.role, selectedUser.status)}
                                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">Save
                                Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BackendUsersManagement
