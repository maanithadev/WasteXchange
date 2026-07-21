import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../../components/Loading"

const AdminUserManagement = () => {
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_GET_ALL_USERS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(res.data)
            setFilteredData(res.data)
            setLoading(false)
        }
        fetchData()
    }, [refresh])
    console.log(data)

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

    async function handleUpdateStatus(id, newStatus) {
        try {
            await axios.put(import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_UPDATE_USER_STATUS_URL,
                { user_id: id, status: newStatus },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setRefresh(!refresh)
            if (selectedUser) setSelectedUser(null)
        } catch (err) {
            console.log(err.message)
        }
    }

    return loading ? <Loading /> : (
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
                                    <tr key={index}>
                                        <td class="px-6 py-3.5 font-medium text-slate-800">{item.company_name}</td>
                                        <td class="px-6 py-3.5 text-slate-500">{item.email}</td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{item.role}</span></td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{item.status}</span></td>
                                        <td class="px-6 py-3.5 text-slate-500">{item.created_at}</td>
                                        <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                            <button onClick={() => setSelectedUser(item)} class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View</button>
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
                        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                            <h2 className="text-lg font-semibold text-slate-800">User Details</h2>
                            <button onClick={() => setSelectedUser(null)} className="text-slate-400 hover:text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Company Name</label>
                                    <input type="text" readOnly value={selectedUser.company_name || ""} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                                    <input type="text" readOnly value={selectedUser.email || ""} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Role</label>
                                    <input type="text" readOnly value={selectedUser.role || ""} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 capitalize text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Phone</label>
                                    <input type="text" readOnly value={selectedUser.phone_number || ""} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Address</label>
                                    <textarea readOnly rows="2" value={`${selectedUser.address?.street || ""}, ${selectedUser.address?.city || ""}\n${selectedUser.address?.state || ""} ${selectedUser.address?.postal_code || ""}, ${selectedUser.address?.country || ""}`} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 resize-none text-slate-700 outline-none"></textarea>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Joined Date</label>
                                    <input type="text" readOnly value={new Date(selectedUser.created_at).toLocaleDateString() || ""} className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                                    <select
                                        value={selectedUser.status}
                                        onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                                        className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                                    >
                                        <option value="active">Active</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                            <button onClick={() => setSelectedUser(null)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors">Cancel</button>
                            <button onClick={() => handleUpdateStatus(selectedUser._id, selectedUser.status)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">Save Changes</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AdminUserManagement
