import { useEffect, useState } from "react";
import axios from "axios";

const BuyerPayment = () => {
    const [data, setData] = useState([]);
    const statusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-emerald-200"
            case "pending":
                return "bg-yellow-200"
            case "failed":
                return "bg-red-200"
            case "refunded":
                return "bg-red-200"
            default:
                return null
        }
    }

    useEffect(() => {
        async function loadPayments() {
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_BUYER_PAYMENTS_INFO_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }

        loadPayments()
    }, []);

    return (
        <>
            {/* <!-- PAYMENT / CHECKOUT PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
                    <p className="text-sm text-slate-500 mt-1">Review your order and complete payment</p>
                </div>

                {/* <!-- Transaction history --> */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-900">Past Transactions</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Date</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Amount</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-slate-600">{item.created_at}</td>
                                        <td className="px-6 py-4 font-medium text-slate-800">{item.sellerDetails?.company_name}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.currency === "LKR" ? "RS." : "$"}{item.total_price}</td>
                                        <td className="px-6 py-4"><span
                                            className={`text-xs font-semibold text-black px-2.5 py-1 rounded-full ${statusColor(item.payment_status)}`}>{item.payment_status}</span>
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

export default BuyerPayment
