import { useEffect, useState } from "react";
import axios from "axios";

const BuyerPayment = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        async function loadPayments() {
            const res = await axios.get(import.meta.env.VITE_GET_BUYER_PAYMENTS_INFO_URL, {
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

                {/*<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">*/}
                {/*    /!* <!-- Order summary --> *!/*/}
                {/*    <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">*/}
                {/*        <h2 class="text-lg font-semibold text-slate-900 mb-4">Order Summary</h2>*/}
                {/*        <div class="flex gap-4 pb-4 border-b border-slate-100">*/}
                {/*            <img src="https://placehold.co/80x80" class="w-20 h-20 rounded-lg object-cover" alt="Shredded HDPE Pellets" />*/}
                {/*            <div class="flex-1">*/}
                {/*                <p class="text-sm font-semibold text-slate-900">Shredded HDPE Pellets</p>*/}
                {/*                <p class="text-xs text-slate-500 mt-1">Sold by Green Metals Co.</p>*/}
                {/*                <p class="text-xs text-slate-500">Quantity: 500 kg</p>*/}
                {/*            </div>*/}
                {/*            <p class="text-sm font-semibold text-slate-900">$360.00</p>*/}
                {/*        </div>*/}

                {/*        <div class="pt-4 space-y-2">*/}
                {/*            <div class="flex justify-between text-sm text-slate-600">*/}
                {/*                <span>Subtotal</span>*/}
                {/*                <span>$360.00</span>*/}
                {/*            </div>*/}
                {/*            <div class="flex justify-between text-sm text-slate-600">*/}
                {/*                <span>Platform Fee</span>*/}
                {/*                <span>$14.40</span>*/}
                {/*            </div>*/}
                {/*            <div class="flex justify-between text-sm text-slate-600">*/}
                {/*                <span>Estimated Freight</span>*/}
                {/*                <span>$85.00</span>*/}
                {/*            </div>*/}
                {/*            <div class="flex justify-between text-base font-bold text-slate-900 pt-3 border-t border-slate-100">*/}
                {/*                <span>Total</span>*/}
                {/*                <span>$459.40</span>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}

                {/*    /!* <!-- Payment method --> *!/*/}
                {/*    <div class="bg-white rounded-xl border border-slate-200 p-6 h-fit">*/}
                {/*        <h2 class="text-lg font-semibold text-slate-900 mb-4">Payment Method</h2>*/}
                {/*        <form class="space-y-4">*/}
                {/*            <div>*/}
                {/*                <label class="block text-sm font-medium text-slate-700 mb-2">Card Number</label>*/}
                {/*                <input type="text" placeholder="1234 5678 9012 3456" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />*/}
                {/*            </div>*/}
                {/*            <div class="grid grid-cols-2 gap-3">*/}
                {/*                <div>*/}
                {/*                    <label class="block text-sm font-medium text-slate-700 mb-2">Expiry</label>*/}
                {/*                    <input type="text" placeholder="MM/YY" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <label class="block text-sm font-medium text-slate-700 mb-2">CVC</label>*/}
                {/*                    <input type="text" placeholder="123" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <label class="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>*/}
                {/*                <input type="text" placeholder="Name on card" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />*/}
                {/*            </div>*/}
                {/*            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg mt-2">Confirm Payment</button>*/}
                {/*        </form>*/}
                {/*    </div>*/}
                {/*</div>*/}

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
                                        <td className="px-6 py-4 font-medium text-slate-800">{item.seller_id?.company_name}</td>
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
