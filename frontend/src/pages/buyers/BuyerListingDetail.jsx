
const BuyerListingDetail = () => {
    return (
        <>
            {/* <!-- LISTING DETAIL PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <p className="text-xs font-medium text-blue-600 mb-4">Browse Marketplace / Listing Detail</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* <!-- Left: image + description --> */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <img src="https://placehold.co/800x420" className="w-full h-80 object-cover" alt="Shredded HDPE Pellets" />
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">Plastics</span>
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    AI Verified 92%
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">Shredded HDPE Pellets</h1>
                            <p className="text-sm text-slate-500 mb-4">500 kg available &middot; Newark, NJ</p>
                            <h2 className="text-sm font-semibold text-slate-900 mb-2">Description</h2>
                            <p className="text-sm text-slate-600 leading-relaxed">High-density polyethylene pellets, shredded and cleaned, sourced from post-industrial packaging waste. Approximately 98% purity with minimal contamination. Stored indoors, ready for immediate pickup or freight arrangement.</p>
                        </div>
                    </div>

                    {/* <!-- Right: seller info, match score, actions --> */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <p className="text-sm font-medium text-slate-500 mb-1">Price</p>
                            <p className="text-3xl font-bold text-slate-900 mb-4">$0.72<span className="text-sm font-medium text-slate-400">/kg</span></p>

                            <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 mb-5">
                                <p className="text-xs text-slate-500 mb-1">Match Score</p>
                                <div className="w-full bg-white rounded-full h-2 mb-1 border border-blue-100">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: "91%"}}></div>
                                </div>
                                <p className="text-xs font-semibold text-blue-700">91% match for your profile</p>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg mb-2">Place Order</button>
                            <button className="w-full border border-slate-300 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50">Message Seller</button>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2 className="text-sm font-semibold text-slate-900 mb-4">Seller Information</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover" alt="Green Metals Co." />
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Green Metals Co.</p>
                                    <p className="text-xs text-slate-500">Verified Seller</p>
                                </div>
                            </div>
                            <ul className="text-sm text-slate-600 space-y-2">
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                    1200 Industrial Way, Newark, NJ
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    98% on-time delivery rate
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BuyerListingDetail
