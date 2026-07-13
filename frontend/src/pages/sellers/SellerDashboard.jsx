
const SellerDashboard = () => {
    return (
        <>
            {/* <!-- SELLER DASHBOARD PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-sm text-slate-500 mt-1">Welcome back, Green Metals Co.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        Upload Waste
                    </button>
                </div>

                {/* <!-- Summary cards --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Active Listings</span>
                            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">18</p>
                        <p className="text-xs text-slate-400 mt-1">+2 this week</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Pending Orders</span>
                            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">6</p>
                        <p className="text-xs text-slate-400 mt-1">Awaiting confirmation</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Unread Notifications</span>
                            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">3</p>
                        <p className="text-xs text-slate-400 mt-1">New updates</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-slate-500">Total Carbon Saved</span>
                            <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" /></svg>
                            </div>
                        </div>
                        <p className="text-3xl font-bold text-slate-900">4.2t</p>
                        <p className="text-xs text-slate-400 mt-1">CO2e this year</p>
                    </div>
                </div>

                {/* <!-- Recent activity feed --> */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
                    <ul className="divide-y divide-slate-100">
                        <li className="flex items-start gap-4 py-4">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-800"><span className="font-medium">EcoPlast Industries</span> confirmed an order for Shredded HDPE Pellets</p>
                                <p className="text-xs text-slate-400 mt-0.5">2 hours ago</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 py-4">
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-800">New message from <span className="font-medium">Circular Metals Ltd.</span> about Scrap Aluminum Sheets</p>
                                <p className="text-xs text-slate-400 mt-0.5">5 hours ago</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 py-4">
                            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-800">Your listing <span className="font-medium">Wood Offcuts – Grade A</span> went live</p>
                                <p className="text-xs text-slate-400 mt-0.5">1 day ago</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 py-4">
                            <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a4 4 0 00-8 0v2m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-800">Payout of <span className="font-medium">$1,240.00</span> was deposited</p>
                                <p className="text-xs text-slate-400 mt-0.5">2 days ago</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default SellerDashboard
