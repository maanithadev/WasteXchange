
const SellerOrdersReceived = () => {
    return (
        <>
            {/* <!-- ORDERS RECEIVED PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Orders Received</h1>
                    <p class="text-sm text-slate-500 mt-1">Track and manage incoming orders from buyers</p>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Buyer</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Waste Item</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Quantity</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Order Date</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">EcoPlast Industries</td>
                                    <td class="px-6 py-4 text-slate-600">Shredded HDPE Pellets</td>
                                    <td class="px-6 py-4 text-slate-600">500 kg</td>
                                    <td class="px-6 py-4 text-slate-600">Jul 6, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Pending</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Update Status</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">Circular Metals Ltd.</td>
                                    <td class="px-6 py-4 text-slate-600">Scrap Aluminum Sheets</td>
                                    <td class="px-6 py-4 text-slate-600">1.2 tons</td>
                                    <td class="px-6 py-4 text-slate-600">Jul 5, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">Confirmed</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Update Status</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">Greenline Polymers</td>
                                    <td class="px-6 py-4 text-slate-600">Cotton Textile Scraps</td>
                                    <td class="px-6 py-4 text-slate-600">300 kg</td>
                                    <td class="px-6 py-4 text-slate-600">Jul 3, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Collected</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">View Details</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">Renew Plastics Co.</td>
                                    <td class="px-6 py-4 text-slate-600">E-Waste Circuit Boards</td>
                                    <td class="px-6 py-4 text-slate-600">150 kg</td>
                                    <td class="px-6 py-4 text-slate-600">Jul 2, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Pending</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Update Status</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">Industrial Reuse Corp.</td>
                                    <td class="px-6 py-4 text-slate-600">Concrete Rubble</td>
                                    <td class="px-6 py-4 text-slate-600">8 tons</td>
                                    <td class="px-6 py-4 text-slate-600">Jun 29, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Collected</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">View Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SellerOrdersReceived
