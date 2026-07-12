
const SellerEarnings = () => {
    return (
        <>
            {/* <!-- PAYMENTS / EARNINGS PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Payments &amp; Earnings</h1>
                    <p class="text-sm text-slate-500 mt-1">Review your transaction history and payouts</p>
                </div>

                {/* <!-- Summary cards --> */}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    <div class="bg-white rounded-xl border border-slate-200 p-6">
                        <p class="text-sm font-medium text-slate-500 mb-2">Total Earnings</p>
                        <p class="text-3xl font-bold text-slate-900">$18,420.00</p>
                        <p class="text-xs text-emerald-600 mt-1">+$1,240.00 this month</p>
                    </div>
                    <div class="bg-white rounded-xl border border-slate-200 p-6">
                        <p class="text-sm font-medium text-slate-500 mb-2">Pending Payouts</p>
                        <p class="text-3xl font-bold text-slate-900">$2,150.00</p>
                        <p class="text-xs text-slate-400 mt-1">Next payout on Jul 15, 2026</p>
                    </div>
                </div>

                {/* <!-- Transaction history --> */}
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-200">
                        <h2 class="text-lg font-semibold text-slate-900">Transaction History</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Date</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Buyer</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Amount</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="px-6 py-4 text-slate-600">Jul 6, 2026</td>
                                    <td class="px-6 py-4 font-medium text-slate-800">EcoPlast Industries</td>
                                    <td class="px-6 py-4 text-slate-600">$860.00</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Pending</span></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 text-slate-600">Jul 3, 2026</td>
                                    <td class="px-6 py-4 font-medium text-slate-800">Greenline Polymers</td>
                                    <td class="px-6 py-4 text-slate-600">$410.00</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Paid</span></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 text-slate-600">Jun 29, 2026</td>
                                    <td class="px-6 py-4 font-medium text-slate-800">Industrial Reuse Corp.</td>
                                    <td class="px-6 py-4 text-slate-600">$1,240.00</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Paid</span></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 text-slate-600">Jun 21, 2026</td>
                                    <td class="px-6 py-4 font-medium text-slate-800">Circular Metals Ltd.</td>
                                    <td class="px-6 py-4 text-slate-600">$2,015.00</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">Failed</span></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 text-slate-600">Jun 14, 2026</td>
                                    <td class="px-6 py-4 font-medium text-slate-800">Renew Plastics Co.</td>
                                    <td class="px-6 py-4 text-slate-600">$305.00</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Paid</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SellerEarnings
