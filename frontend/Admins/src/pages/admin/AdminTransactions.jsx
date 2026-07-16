
const AdminTransactions = () => {
    return (
        <>
            {/* <!-- TRANSACTIONS / PAYMENT OVERSIGHT PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Transactions &amp; Payment Oversight</h1>
                    <p class="text-sm text-slate-500 mt-1">Monitor platform-wide payment activity</p>
                </div>

                {/* <!-- Summary stat cards --> */}
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Total Revenue Processed</p>
                        <p class="text-2xl font-bold text-slate-900">$482,910</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Pending Payouts</p>
                        <p class="text-2xl font-bold text-slate-900">$18,240</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Disputed Transactions</p>
                        <p class="text-2xl font-bold text-red-600">7</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Transaction ID</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Buyer</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Amount</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Date</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TXN-88231</td>
                                    <td class="px-6 py-3.5 text-slate-700">EcoPlast Industries</td>
                                    <td class="px-6 py-3.5 text-slate-700">Green Metals Co.</td>
                                    <td class="px-6 py-3.5 text-slate-700">$360.00</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Disputed</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 6, 2026</td>
                                    <td class="px-6 py-3.5 text-right"><button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View Details</button></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TXN-88198</td>
                                    <td class="px-6 py-3.5 text-slate-700">Circular Metals Ltd.</td>
                                    <td class="px-6 py-3.5 text-slate-700">MetalWorks Recycling</td>
                                    <td class="px-6 py-3.5 text-slate-700">$1,470.00</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Completed</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 4, 2026</td>
                                    <td class="px-6 py-3.5 text-right"><button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View Details</button></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TXN-88104</td>
                                    <td class="px-6 py-3.5 text-slate-700">Renew Plastics Co.</td>
                                    <td class="px-6 py-3.5 text-slate-700">Wood Reclaim Co.</td>
                                    <td class="px-6 py-3.5 text-slate-700">$210.00</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pending</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 3, 2026</td>
                                    <td class="px-6 py-3.5 text-right"><button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View Details</button></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TXN-87950</td>
                                    <td class="px-6 py-3.5 text-slate-700">Fabric Loop Inc.</td>
                                    <td class="px-6 py-3.5 text-slate-700">Textile Renew Corp.</td>
                                    <td class="px-6 py-3.5 text-slate-700">$305.00</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Refunded</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jun 29, 2026</td>
                                    <td class="px-6 py-3.5 text-right"><button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View Details</button></td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TXN-87801</td>
                                    <td class="px-6 py-3.5 text-slate-700">Site Clear Corp.</td>
                                    <td class="px-6 py-3.5 text-slate-700">Industrial Reuse Corp.</td>
                                    <td class="px-6 py-3.5 text-slate-700">$960.00</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Completed</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jun 25, 2026</td>
                                    <td class="px-6 py-3.5 text-right"><button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View Details</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminTransactions
