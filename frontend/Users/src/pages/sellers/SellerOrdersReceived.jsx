import { useEffect, useState } from "react";
import axios from "axios";

const SellerOrdersReceived = () => {
    const [data, setData] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedItem, setSelectedItem] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const statusList = ["pending", "confirmed", "shipped", "cancelled"]

    useEffect(() => {
        async function loadOrders() {
            const res = await axios.get(import.meta.env.VITE_GET_SELLER_ORDER_INFO_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }

        loadOrders()
    }, []);

    const handleUpdateStatus = async () => {
        try {
            await axios.post(import.meta.env.VITE_UPDATE_SELLER_ORDER_STATUS_URL, {
                order_id: orderToUpdate._id,
                status: selectedStatus,
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            setData(prevData => prevData.map(item =>
                item._id === orderToUpdate._id ? { ...item, status: selectedStatus } : item
            ));

            setIsStatusModalOpen(false);
            setOrderToUpdate(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleView = async (id) => {
        const res = await axios.get(import.meta.env.VITE_GET_SELLER_ORDER_ADVANCE_INFO_URL + id, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });
        setSelectedItem(res.data);
        console.log(res.data)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem({});
    };

    const renderDynamicFields = (obj, parentKey = '') => {
        if (!obj) return null;

        return Object.entries(obj).map(([key, value]) => {
            let label = key;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return renderDynamicFields(value, key);
            }

            if (Array.isArray(value)) {
                value = value.join(', ');
            }

            return (
                <div key={`${parentKey}-${key}`} className="">
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize text-nowrap truncate">{label.replace(/_/g, ' ')}</label>
                    <input type="text" readOnly value={value || ""} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-600 focus:outline-none" />
                </div>
            )
        });
    }

    return (
        <>
            {/* <!-- ORDERS RECEIVED PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen relative">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Orders Received</h1>
                    <p className="text-sm text-slate-500 mt-1">Track and manage incoming orders from buyers</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Buyer</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Waste Item</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Quantity</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Order Date</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th className="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 font-medium text-slate-800">{item.buyerDetails?.company_name}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.wasteListings_id?.title}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.quantity} {item.unit}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.ordered_date}</td>
                                        <td className="px-6 py-4"><span
                                            className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full capitalize">{item.status}</span>
                                        </td>
                                        <td className="flex px-6 py-4 text-right gap-2">
                                            {item.status === "shipped" || item.status === "collected" || item.status === "cancelled"
                                                ? null
                                                : <button
                                                    onClick={() => {
                                                        setOrderToUpdate(item);
                                                        setSelectedStatus(item.status?.toLowerCase() || "pending");
                                                        setIsStatusModalOpen(true);
                                                    }}
                                                    className="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Update
                                                    Status
                                                </button>}
                                            <button onClick={() => handleView(item._id)} className="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">View Details</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Update Status Modal */}
                {isStatusModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
                            <h2 className="text-xl font-bold text-slate-900 mb-4">Update Order Status</h2>
                            <p className="text-sm text-slate-500 mb-6">Select the new status for this order.</p>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                {statusList.map((statusOption, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setSelectedStatus(statusOption)}
                                        className={`capitalize px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${selectedStatus === statusOption
                                            ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        {statusOption}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setIsStatusModalOpen(false)} className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50">Cancel</button>
                                {/* update status */}
                                <button type="button" onClick={handleUpdateStatus} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Update</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* <!-- MODAL --> */}
                {isModalOpen && selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between p-6 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-800">Order Details</h2>
                                <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 focus:outline-none">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1">
                                {selectedItem && (
                                    <>
                                        <div className="mb-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {renderDynamicFields(selectedItem)}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default SellerOrdersReceived
