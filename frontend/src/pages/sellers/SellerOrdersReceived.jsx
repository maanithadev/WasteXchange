import {useEffect, useState} from "react";
import axios from "axios";

const SellerOrdersReceived = () => {
    const [data, setData] = useState([]);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [orderToUpdate, setOrderToUpdate] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("");

    useEffect(() => {
        async function loadOrders() {
            const res = await axios.get("http://localhost:3000/api/orders/seller-simple-info", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }

        loadOrders()
    }, []);

    const handleUpdateStatus = () => {
        console.log("Update order:", orderToUpdate, "to status:", selectedStatus);
        // Here you would typically make an API call to update the order status
        setIsStatusModalOpen(false);
        setOrderToUpdate(null);
    };

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
                                    <td className="px-6 py-4 font-medium text-slate-800">{item.buyer_id?.company_name}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.wasteListings_id?.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.quantity} {item.unit}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.ordered_date}</td>
                                    <td className="px-6 py-4"><span
                                        className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full capitalize">{item.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => {
                                                setOrderToUpdate(item);
                                                setSelectedStatus(item.status?.toLowerCase() || "pending");
                                                setIsStatusModalOpen(true);
                                            }}
                                            className="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Update
                                            Status
                                        </button>
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
                                {["pending", "confirmed", "collected", "cancelled"].map((statusOption) => (
                                    <button
                                        key={statusOption}
                                        type="button"
                                        onClick={() => setSelectedStatus(statusOption)}
                                        className={`capitalize px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                                            selectedStatus === statusOption 
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
                                <button type="button" onClick={handleUpdateStatus} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Update</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default SellerOrdersReceived
