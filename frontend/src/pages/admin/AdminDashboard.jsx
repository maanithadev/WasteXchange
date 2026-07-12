
const AdminDashboard = () => {
    return (
        <>
            {/* <!-- ADMIN DASHBOARD PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p class="text-sm text-slate-500 mt-1">Platform-wide overview and activity</p>
                </div>

                {/* <!-- Summary stat cards --> */}
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Total Users</p>
                        <p class="text-2xl font-bold text-slate-900">3,214</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Total Sellers</p>
                        <p class="text-2xl font-bold text-slate-900">1,340</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Total Buyers</p>
                        <p class="text-2xl font-bold text-slate-900">1,874</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Active Listings</p>
                        <p class="text-2xl font-bold text-slate-900">618</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Total Transactions</p>
                        <p class="text-2xl font-bold text-slate-900">9,850</p>
                    </div>
                    <div class="bg-white rounded-lg border border-slate-200 p-4">
                        <p class="text-xs font-medium text-slate-500 mb-1">Carbon Saved</p>
                        <p class="text-2xl font-bold text-slate-900">21.6kt</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* <!-- Chart placeholder --> */}
                    <div class="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                        <h2 class="text-sm font-semibold text-slate-900 mb-4">Platform Growth Over Time</h2>
                        <div class="w-full h-72 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                            <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
                        </div>
                    </div>

                    {/* <!-- Activity / audit feed --> */}
                    <div class="bg-white rounded-xl border border-slate-200 p-6">
                        <h2 class="text-sm font-semibold text-slate-900 mb-4">Recent Activity</h2>
                        <ul class="divide-y divide-slate-100">
                            <li class="py-3 flex items-start gap-3">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                                <div>
                                    <p class="text-xs text-slate-800">New seller registered: <span class="font-medium">MetalWorks Recycling</span></p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">12 minutes ago</p>
                                </div>
                            </li>
                            <li class="py-3 flex items-start gap-3">
                                <span class="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                                <div>
                                    <p class="text-xs text-slate-800">Listing flagged: <span class="font-medium">Industrial Solvent Drums</span></p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">40 minutes ago</p>
                                </div>
                            </li>
                            <li class="py-3 flex items-start gap-3">
                                <span class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                                <div>
                                    <p class="text-xs text-slate-800">Payment disputed on order <span class="font-medium">#TXN-88231</span></p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">1 hour ago</p>
                                </div>
                            </li>
                            <li class="py-3 flex items-start gap-3">
                                <span class="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                                <div>
                                    <p class="text-xs text-slate-800">AI classification review needed for <span class="font-medium">3 listings</span></p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">2 hours ago</p>
                                </div>
                            </li>
                            <li class="py-3 flex items-start gap-3">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                                <div>
                                    <p class="text-xs text-slate-800">New buyer registered: <span class="font-medium">Renew Plastics Co.</span></p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">3 hours ago</p>
                                </div>
                            </li>
                            <li class="py-3 flex items-start gap-3">
                                <span class="w-2 h-2 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                                <div>
                                    <p class="text-xs text-slate-800">Support ticket resolved: <span class="font-medium">#TCK-4471</span></p>
                                    <p class="text-[10px] text-slate-400 mt-0.5">5 hours ago</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminDashboard
