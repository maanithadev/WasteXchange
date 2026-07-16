
const AdminListingModeration = () => {
    return (
        <>
            {/* <!-- LISTING MODERATION PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Listing Moderation</h1>
                    <p class="text-sm text-slate-500 mt-1">Review listings pending approval or flagged by users</p>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Listing</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Seller</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Flag Reason</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Submitted</th>
                                    <th class="text-right font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="px-6 py-3.5">
                                        <div class="flex items-center gap-3">
                                            <img src="https://placehold.co/48x48" class="w-10 h-10 rounded-lg object-cover" alt="Industrial Solvent Drums" />
                                            <div>
                                                <p class="font-medium text-slate-800">Industrial Solvent Drums</p>
                                                <p class="text-xs text-slate-400">Chemicals</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-3.5 text-slate-600">Site Clear Corp.</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Hazardous Material Concern</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 8, 2026</td>
                                    <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                        <button class="text-xs font-medium bg-emerald-600 text-white rounded-md px-2.5 py-1 hover:bg-emerald-700">Approve</button>
                                        <button class="text-xs font-medium bg-red-600 text-white rounded-md px-2.5 py-1 hover:bg-red-700">Reject</button>
                                        <button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5">
                                        <div class="flex items-center gap-3">
                                            <img src="https://placehold.co/48x48" class="w-10 h-10 rounded-lg object-cover" alt="Mixed Plastic Bales" />
                                            <div>
                                                <p class="font-medium text-slate-800">Mixed Plastic Bales</p>
                                                <p class="text-xs text-slate-400">Plastics</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-3.5 text-slate-600">PolyRecover Inc.</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Misleading Photos</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 8, 2026</td>
                                    <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                        <button class="text-xs font-medium bg-emerald-600 text-white rounded-md px-2.5 py-1 hover:bg-emerald-700">Approve</button>
                                        <button class="text-xs font-medium bg-red-600 text-white rounded-md px-2.5 py-1 hover:bg-red-700">Reject</button>
                                        <button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5">
                                        <div class="flex items-center gap-3">
                                            <img src="https://placehold.co/48x48" class="w-10 h-10 rounded-lg object-cover" alt="Scrap Copper Wiring" />
                                            <div>
                                                <p class="font-medium text-slate-800">Scrap Copper Wiring</p>
                                                <p class="text-xs text-slate-400">Metals</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-3.5 text-slate-600">MetalWorks Recycling</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-medium text-slate-400">— Pending first review —</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 9, 2026</td>
                                    <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                        <button class="text-xs font-medium bg-emerald-600 text-white rounded-md px-2.5 py-1 hover:bg-emerald-700">Approve</button>
                                        <button class="text-xs font-medium bg-red-600 text-white rounded-md px-2.5 py-1 hover:bg-red-700">Reject</button>
                                        <button class="text-xs font-medium border border-amber-200 text-amber-600 rounded-md px-2.5 py-1 hover:bg-amber-50">Flag</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5">
                                        <div class="flex items-center gap-3">
                                            <img src="https://placehold.co/48x48" class="w-10 h-10 rounded-lg object-cover" alt="Used Motor Oil Containers" />
                                            <div>
                                                <p class="font-medium text-slate-800">Used Motor Oil Containers</p>
                                                <p class="text-xs text-slate-400">Chemicals</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-3.5 text-slate-600">AutoParts Salvage Co.</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Requires Special Permit</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 7, 2026</td>
                                    <td class="px-6 py-3.5 text-right space-x-1 whitespace-nowrap">
                                        <button class="text-xs font-medium bg-emerald-600 text-white rounded-md px-2.5 py-1 hover:bg-emerald-700">Approve</button>
                                        <button class="text-xs font-medium bg-red-600 text-white rounded-md px-2.5 py-1 hover:bg-red-700">Reject</button>
                                        <button class="text-xs font-medium border border-slate-300 text-slate-600 rounded-md px-2.5 py-1 hover:bg-slate-50">View</button>
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

export default AdminListingModeration
