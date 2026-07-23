import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const BuyerMyOrders = () => {
    const [data, setData] = useState([]);
    const [confirmOrder, setConfirmOrder] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const statusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-emerald-200"
            case "confirmed":
                return "bg-yellow-200"
            case "shipped":
                return "bg-blue-200"
            case "collected":
                return "bg-emerald-200"
            case "cancelled":
                return "bg-red-200"
            default:
                return null
        }
    }

    useEffect(() => {
        async function loadOrders() {
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_BUYER_ORDER_INFO_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }

        loadOrders()
    }, []);

    const handleMarkCollected = async () => {
        if (!confirmOrder) return;
        setIsUpdating(true);
        try {
            await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_MARK_ORDER_COLLECTED_URL + confirmOrder._id, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Update local state immediately
            setData(data.map(order =>
                order._id === confirmOrder._id
                    ? { ...order, status: "collected" }
                    : order
            ));
            toast.success('Order marked as collected successfully!')
        } catch (err) {
            toast.error('Something went wrong! Please try again later.')
        } finally {
            setIsUpdating(false);
            setConfirmOrder(null);
        }
    };

    return (
        <>
            {/* <!-- MY ORDERS PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">My Orders</h1>
                    <p class="text-sm text-slate-500 mt-1">Track your order history and delivery status</p>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Waste
                                        Item
                                    </th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Quantity</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Order
                                        Date
                                    </th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 font-medium text-slate-800">{item.sellerDetails?.company_name}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.wasteListings_id?.title}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.quantity} {item.unit}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.ordered_date}</td>
                                        <td className="px-6 py-4"><span
                                            className={`text-xs font-semibold text-black px-2.5 py-1 rounded-full capitalize ${statusColor(item.status)}`}>{item.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right flex gap-2">
                                            {item.status.toLowerCase() === "cancelled" || item.status.toLowerCase() === "collected"
                                                ? null
                                                : <button
                                                    className={`text-xs font-medium rounded-lg px-3 py-1.5 transition-colors ${item.status?.toLowerCase() === 'shipped'
                                                        ? 'border border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer'
                                                        : 'border border-slate-200 text-slate-400 bg-slate-50 cursor-not-allowed opacity-60'
                                                        }`}
                                                    disabled={item.status?.toLowerCase() !== 'shipped'}
                                                    onClick={() => setConfirmOrder(item)}
                                                    title={
                                                        item.status?.toLowerCase() === 'collected' ? "This order has already been collected" :
                                                            item.status?.toLowerCase() !== 'shipped' ? "This button is only available when the order becomes Shipped" : "Mark order as collected"
                                                    }
                                                >
                                                    {item.status?.toLowerCase() === 'collected' ? 'Order Collected' : 'Collected'}
                                                </button>}
                                            <Link to={`/buyer/track-order/${item.order_reference_number}`}>
                                                <button
                                                    className="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Track Order
                                                </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Confirmation Modal */}
            {confirmOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4 text-blue-600 mx-auto">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Confirm Collection</h3>
                            <p className="text-sm text-slate-500 text-center">
                                Are you sure you want to mark this order as collected?
                                <br />This action cannot be undone.
                            </p>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button
                                onClick={() => setConfirmOrder(null)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors disabled:opacity-50"
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleMarkCollected}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 flex items-center gap-2"
                                disabled={isUpdating}
                            >
                                {isUpdating && (
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                )}
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default BuyerMyOrders
