import { useEffect, useState } from "react";
import axios from "axios";

const BuyerPayment = () => {
    const [data, setData] = useState([]);
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
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Checkout</h1>
                    <p class="text-sm text-slate-500 mt-1">Review your order and complete payment</p>
                </div>

                {/* <!-- Transaction history --> */}
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-200">
                        <h2 class="text-lg font-semibold text-slate-900">Past Transactions</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Date</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Amount</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-slate-600">{item.created_at}</td>
                                        <td className="px-6 py-4 font-medium text-slate-800">{item.sellerDetails?.company_name}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.currency === "LKR" ? "RS." : "$"}{item.total_price}</td>
                                        <td className="px-6 py-4"><span
                                            className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">{item.payment_status}</span>
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
