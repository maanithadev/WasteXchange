import { useEffect, useState } from "react"
import axios from "axios"

const AdminListingModeration = () => {
    const [data, setData] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const [rejectMessage, setRejectMessage] = useState("")
    const [statusValue, setStatusValue] = useState(null)

    const statusList = ["Active", "Rejected", "Review"]

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(import.meta.env.VITE_GET_ALL_WASTE_LISTINGS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(res.data)
        }
        fetchData()
    }, [refresh])

    const handleView = (item) => {
        setSelectedItem(item)
        setStatusValue(item.status)
        setIsModalOpen(true)
    }
    console.log(statusValue)

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
    }

    function handleStatusChange(e) {
        setStatusValue(e.target.value)
    }

    const handleUpdateStatus = async () => {
        try {
            await axios.put(import.meta.env.VITE_UPDATE_LISTING_STATUS_URL,
                {
                    listing_id: selectedItem._id,
                    status: statusValue,
                    suspend_message: rejectMessage
                },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
            setRefresh(!refresh)
            setIsRejectModalOpen(false)
            setSelectedItem(null)
            setRejectMessage("")
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            {/* <!-- LISTING MODERATION PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Listing Moderation</h1>
                    <p class="text-sm text-slate-500 mt-1">Review listings pending approval or flagged by users</p>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Listing</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Price</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Submitted</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td class="px-6 py-3.5">
                                            <div class="flex items-center gap-3">
                                                <img src={`http://localhost:3000/images/${item.image}`} class="w-10 h-10 rounded-lg object-cover" alt="Industrial Solvent Drums" />
                                                <div>
                                                    <p class="font-medium text-slate-800">{item.title}</p>
                                                    <p class="text-xs text-slate-400">{item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="px-6 py-3.5 text-slate-600">{item.seller_id?.company_name}</td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-green-200 text-red-700 px-2 py-0.5 rounded-full">{item.currency === "LKR" ? "RS." : "$"}{item.price}</span></td>
                                        <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-green-200 text-red-700 px-2 py-0.5 rounded-full">{item.status}</span></td>
                                        <td class="px-6 py-3.5 text-slate-500">{item.created_at}</td>
                                        <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                            {/* <button class="text-xs font-medium bg-emerald-600 text-white rounded-md px-2.5 py-1 hover:bg-emerald-700">Approve</button> */}
                                            <button type="button" onClick={() => {
                                                setStatusValue("Rejected")
                                                setSelectedItem(item);
                                                setIsRejectModalOpen(true);
                                                setRejectMessage("");
                                            }} class="text-xs font-medium bg-red-600 text-white rounded-md px-2.5 py-1 hover:bg-red-700">Reject</button>
                                            <button onClick={() => handleView(item)} class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <!-- MODAL --> */}
                {isModalOpen && selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Listing Details</h2>
                                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            < div className="space-y-6">
                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                                    <select value={statusValue} onChange={handleStatusChange} className={`w-full text-sm border-2 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none ${statusValue === "Rejected" ? "border-red-500" : "border-slate-200"}`}>
                                        {statusList.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>

                                    {statusValue === "Rejected" && <div className="mt-5">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Suspend Message</label>
                                        <textarea value={selectedItem.suspend_message} rows="5" readOnly className={`w-full text-sm border-2 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none ${statusValue === "Rejected" ? "border-red-500" : "border-slate-200"}`} />
                                    </div>}
                                </div>

                                {/* Image upload (dummy for edit) */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Waste Image</label>
                                    <div className="w-[50%]">
                                        <img src={`http://localhost:3000/images/${selectedItem.image}`} alt="" />
                                    </div>
                                    {/* <input type="text" readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" /> */}
                                </div>

                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Waste Title</label>
                                    <input type="text" value={selectedItem.title} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>

                                {/* Category + Quantity/Unit */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-1">
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Waste Category</label>
                                        <input type="text" value={selectedItem.category} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Quantity</label>
                                        <input type="number" value={selectedItem.quantity} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                                        <input type="text" value={selectedItem.unit} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                    </div>
                                </div>

                                {/* Colour */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Waste Colour</label>
                                    <input type="text" value={selectedItem.colour} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                                    <textarea value={selectedItem.description} rows="10" readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                </div>

                                {/* Pricing + Currency */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Price</label>
                                        <input type="number" value={selectedItem.price} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
                                        <input type="text" value={selectedItem.currency} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                    </div>
                                </div>

                                <hr className="border-slate-200" />

                                {/* Location */}
                                <div className="flex flex-col gap-3">
                                    <label className="block text-md font-medium text-slate-700">Location</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Street</label>
                                            <input type="text" value={selectedItem.location?.street} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                                            <input type="text" value={selectedItem.location?.city} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                                            <input type="text" value={selectedItem.location?.state} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">Postal Code</label>
                                            <input type="text" value={selectedItem.location?.postal_code} readOnly className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 bg-slate-50 text-slate-700 outline-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4">
                                    <button type="button" onClick={closeModal} className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">Cancel</button>
                                    <button type="button" onClick={handleUpdateStatus} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* <!-- REJECT MODAL --> */}
                {isRejectModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-800">Reject Listing</h2>
                                <button onClick={() => setIsRejectModalOpen(false)} className="text-slate-400 hover:text-slate-600 focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Reason for rejection</label>
                                <textarea
                                    rows="4"
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-slate-50"
                                    placeholder="Enter message..."
                                    value={rejectMessage}
                                    onChange={(e) => setRejectMessage(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-xl">
                                <button onClick={() => setIsRejectModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100">Cancel</button>
                                <button onClick={handleUpdateStatus} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </main >
        </>
    )
}

export default AdminListingModeration
