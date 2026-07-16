import { useEffect, useState } from "react"
import axios from "axios"

const AdminListingModeration = () => {
    const [data, setData] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

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
    }, [])

    const handleView = (item) => {
        setSelectedItem(item)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedItem(null)
    }

    const renderDynamicFields = (obj, parentKey = '') => {
        if (!obj) return null;

        return Object.entries(obj).map(([key, value]) => {
            // Ignore specified fields
            if (key === '_id' || key === '__v') return null;

            // Format the label
            let label = key;
            if (parentKey === 'location') label = `Location ${key}`;
            if (parentKey === 'seller_id') {
                if (key === 'company_name') label = 'Seller Company';
                else label = `Seller ${key}`;
            }

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return renderDynamicFields(value, key);
            }

            return (
                <div key={`${parentKey}-${key}`} className={key === 'description' ? "col-span-1 md:col-span-2" : ""}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{label.replace(/_/g, ' ')}</label>
                    {key === 'description' ? (
                        <textarea readOnly rows="4" value={value || ""} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 focus:outline-none"></textarea>
                    ) : (
                        <input type="text" readOnly value={value || ""} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 focus:outline-none" />
                    )}
                </div>
            )
        });
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
                                        <td class="px-6 py-3.5 text-slate-500">{item.created_at}</td>
                                        <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                            {/* <button class="text-xs font-medium bg-emerald-600 text-white rounded-md px-2.5 py-1 hover:bg-emerald-700">Approve</button> */}
                                            <button class="text-xs font-medium bg-red-600 text-white rounded-md px-2.5 py-1 hover:bg-red-700">Reject</button>
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-800">Product Details</h2>
                                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {renderDynamicFields(selectedItem)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default AdminListingModeration
