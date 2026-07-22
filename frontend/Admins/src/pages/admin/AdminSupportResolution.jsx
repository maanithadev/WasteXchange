const AdminSupportResolution = () => {
    return (
        <>
            {/* <!-- SUPPORT / DISPUTE RESOLUTION PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Support &amp; Dispute Resolution</h1>
                    <p class="text-sm text-slate-500 mt-1">Open tickets and disputes requiring admin attention</p>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                            <tr class="bg-slate-50 border-b border-slate-200">
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Ticket
                                    ID
                                </th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Submitted
                                    By
                                </th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Subject</th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Priority</th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Status</th>
                                <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Date</th>
                                <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                            </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                            <tr>
                                <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TCK-4487</td>
                                <td class="px-6 py-3.5 text-slate-700">EcoPlast Industries</td>
                                <td class="px-6 py-3.5 text-slate-700">Payment disputed for TXN-88231</td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High</span>
                                </td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Open</span>
                                </td>
                                <td class="px-6 py-3.5 text-slate-500">Jul 8, 2026</td>
                                <td class="px-6 py-3.5 text-right">
                                    <button
                                        class="text-xs font-medium bg-indigo-600 text-white rounded-md px-2.5 py-1 hover:bg-indigo-700">Respond
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TCK-4482</td>
                                <td class="px-6 py-3.5 text-slate-700">Wood Reclaim Co.</td>
                                <td class="px-6 py-3.5 text-slate-700">Account suspended incorrectly</td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">High</span>
                                </td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">In Progress</span>
                                </td>
                                <td class="px-6 py-3.5 text-slate-500">Jul 7, 2026</td>
                                <td class="px-6 py-3.5 text-right">
                                    <button
                                        class="text-xs font-medium bg-indigo-600 text-white rounded-md px-2.5 py-1 hover:bg-indigo-700">Respond
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TCK-4475</td>
                                <td class="px-6 py-3.5 text-slate-700">Circular Metals Ltd.</td>
                                <td class="px-6 py-3.5 text-slate-700">Listing quality doesn't match photos</td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Medium</span>
                                </td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Open</span>
                                </td>
                                <td class="px-6 py-3.5 text-slate-500">Jul 6, 2026</td>
                                <td class="px-6 py-3.5 text-right">
                                    <button
                                        class="text-xs font-medium bg-indigo-600 text-white rounded-md px-2.5 py-1 hover:bg-indigo-700">Respond
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-3.5 font-mono text-xs text-slate-600">TCK-4471</td>
                                <td class="px-6 py-3.5 text-slate-700">Fabric Loop Inc.</td>
                                <td class="px-6 py-3.5 text-slate-700">Question about payout schedule</td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Low</span>
                                </td>
                                <td class="px-6 py-3.5"><span
                                    class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Resolved</span>
                                </td>
                                <td class="px-6 py-3.5 text-slate-500">Jul 2, 2026</td>
                                <td class="px-6 py-3.5 text-right">
                                    <button
                                        class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View
                                    </button>
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

export default AdminSupportResolution
