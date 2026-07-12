
const BuyerDashboard = () => {
    return (
        <>
            {/* <!-- BUYER DASHBOARD PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
                        <p class="text-sm text-slate-500 mt-1">Welcome back, EcoPlast Industries</p>
                    </div>
                    <button class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
                        Browse Marketplace
                    </button>
                </div>

                {/* <!-- Summary cards --> */}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Matched Listings</span>
                            <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">12</p>
                        <p class="text-xs text-slate-400 mt-1">+3 this week</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Active Orders</span>
                            <div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">5</p>
                        <p class="text-xs text-slate-400 mt-1">In progress</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Unread Notifications</span>
                            <div class="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">2</p>
                        <p class="text-xs text-slate-400 mt-1">New updates</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Total Carbon Offset</span>
                            <div class="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" /></svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">3.1t</p>
                        <p class="text-xs text-slate-400 mt-1">CO2e from purchases</p>
                    </div>
                </div>

                {/* <!-- Recent activity feed --> */}
                <div class="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 class="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
                    <ul class="divide-y divide-slate-100">
                        <li class="flex items-start gap-4 py-4">
                            <div class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-slate-800">Your order for <span class="font-medium">Shredded HDPE Pellets</span> was confirmed by Green Metals Co.</p>
                                <p class="text-xs text-slate-400 mt-0.5">3 hours ago</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 py-4">
                            <div class="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-slate-800">New match found: <span class="font-medium">Scrap Aluminum Sheets</span> (94% match)</p>
                                <p class="text-xs text-slate-400 mt-0.5">6 hours ago</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 py-4">
                            <div class="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-slate-800">New message from <span class="font-medium">Wood Reclaim Co.</span> about Wood Offcuts</p>
                                <p class="text-xs text-slate-400 mt-0.5">1 day ago</p>
                            </div>
                        </li>
                        <li class="flex items-start gap-4 py-4">
                            <div class="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a4 4 0 00-8 0v2m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm text-slate-800">Payment of <span class="font-medium">$860.00</span> was processed successfully</p>
                                <p class="text-xs text-slate-400 mt-0.5">2 days ago</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default BuyerDashboard
