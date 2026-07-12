
const BuyerMyOrders = () => {
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
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Waste Item</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Quantity</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Order Date</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">Green Metals Co.</td>
                                    <td class="px-6 py-4 text-slate-600">Shredded HDPE Pellets</td>
                                    <td class="px-6 py-4 text-slate-600">500 kg</td>
                                    <td class="px-6 py-4 text-slate-600">Jul 6, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">Confirmed</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Track Order</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">MetalWorks Recycling</td>
                                    <td class="px-6 py-4 text-slate-600">Scrap Aluminum Sheets</td>
                                    <td class="px-6 py-4 text-slate-600">1.2 tons</td>
                                    <td class="px-6 py-4 text-slate-600">Jul 4, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">Placed</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">Track Order</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">Wood Reclaim Co.</td>
                                    <td class="px-6 py-4 text-slate-600">Wood Offcuts – Grade A</td>
                                    <td class="px-6 py-4 text-slate-600">2.5 m³</td>
                                    <td class="px-6 py-4 text-slate-600">Jul 1, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Collected</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">View Details</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">CircuitCycle Ltd.</td>
                                    <td class="px-6 py-4 text-slate-600">E-Waste Circuit Boards</td>
                                    <td class="px-6 py-4 text-slate-600">150 kg</td>
                                    <td class="px-6 py-4 text-slate-600">Jun 27, 2026</td>
                                    <td class="px-6 py-4"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">Collected</span></td>
                                    <td class="px-6 py-4 text-right">
                                        <button class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50">View Details</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 font-medium text-slate-800">Site Clear Corp.</td>
                                    <td class="px-6 py-4 text-slate-600">Concrete Rubble</td>
                                    <td class="px-6 py-4 text-slate-600">8 tons</td>
                                    <td class="px-6 py-4 text-slate-600">Jun 20, 2026</td>
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

export default BuyerMyOrders
