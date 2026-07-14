import {useEffect, useState} from "react";
import axios from "axios";

const BuyerMyOrders = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function loadOrders() {
            const res = await axios.get("http://localhost:3000/api/orders/buyer-simple-info", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }

        loadOrders()
    }, []);

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
                                    <td className="px-6 py-4 font-medium text-slate-800">{item.seller_id?.company_name}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.wasteListings_id?.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.quantity} {item.unit}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.ordered_date}</td>
                                    <td className="px-6 py-4"><span
                                        className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">{item.status.toUpperCase()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            className="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Track
                                            Order
                                        </button>
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

export default BuyerMyOrders
