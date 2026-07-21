import { useEffect, useState } from "react";
import axios from "axios";

const SellerEarnings = () => {
    const [data, setData] = useState([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [currentMonthEarnings, setCurrentMonthEarnings] = useState(0);

    useEffect(() => {
        async function loadProducts() {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_GET_SELLER_PAYMENTS_INFO_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data.payments || []);
            setTotalEarnings(res.data.allTimeEarnings || 0);
            setCurrentMonthEarnings(res.data.currentMonthEarnings || 0);
        }

        loadProducts()
    }, []);

    return (
        <>
            {/* <!-- PAYMENTS / EARNINGS PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Payments &amp; Earnings</h1>
                    <p className="text-sm text-slate-500 mt-1">Review your transaction history and payouts</p>
                </div>

                {/* <!-- Summary cards --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-slate-500 mb-2">Pending Payouts</p>
                        <p className="text-3xl font-bold text-slate-900">RS.{currentMonthEarnings}</p>
                        <p className="text-xs text-slate-400 mt-1">This month</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-sm font-medium text-slate-500 mb-2">Total Earnings</p>
                        <p className="text-3xl font-bold text-slate-900">RS.{totalEarnings}</p>
                        <p className="text-xs text-slate-400 mt-1">Since registered</p>
                    </div>
                </div>

                {/* <!-- Transaction history --> */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {/* <div className="px-6 py-4 border-b border-slate-200">
                        <h2 className="text-lg font-semibold text-slate-900">Transaction History</h2>
                    </div> */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Date</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Buyer</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Amount</th>
                                    <th className="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-slate-600">{item.created_at}</td>
                                        <td className="px-6 py-4 font-medium text-slate-800">{item.buyerDetails?.company_name}</td>
                                        <td className="px-6 py-4 text-slate-600">{item.currency === "LKR" ? "RS." : "$"}{item.total_price}</td>
                                        <td className="px-6 py-4"><span
                                            className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">{item.payment_status}</span>
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

export default SellerEarnings
