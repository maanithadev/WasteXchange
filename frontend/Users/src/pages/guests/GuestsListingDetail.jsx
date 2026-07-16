
const GuestsListingDetail = () => {
    return (
        <>
            {/* <!-- LISTING DETAIL PAGE (GUEST, READ-ONLY VIEW) --> */}
            <main className="bg-slate-50 min-h-screen px-6 lg:px-10 py-10">
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs font-medium text-emerald-600 mb-4">Browse Marketplace / Listing Detail</p>

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
                                <p className="text-sm text-slate-500 mb-4">500 kg available &middot; Newark, NJ area</p>
                                <h2 className="text-sm font-semibold text-slate-900 mb-2">Description</h2>
                                <p className="text-sm text-slate-600 leading-relaxed">High-density polyethylene pellets, shredded and cleaned, sourced from post-industrial packaging waste. Approximately 98% purity with minimal contamination. Stored indoors, ready for immediate pickup or freight arrangement.</p>
                            </div>
                        </div>

                        {/* <!-- Right: locked seller info + actions --> */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border border-slate-200 p-6 relative overflow-hidden">
                                <p className="text-sm font-medium text-slate-500 mb-1">Price</p>
                                <p className="text-3xl font-bold text-slate-900 mb-4">$0.72<span className="text-sm font-medium text-slate-400">/kg</span></p>

                                <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 mb-5 blur-[3px] select-none">
                                    <p className="text-xs text-slate-500 mb-1">Match Score</p>
                                    <div className="w-full bg-white rounded-full h-2 mb-1 border border-slate-200"> 
                                        <div className="bg-emerald-500 h-2 rounded-full" style={{width: "91%"}}></div>
                                    </div>
                                    <p className="text-xs font-semibold text-emerald-700">91% match for your profile</p>
                                </div>

                                <button disabled className="w-full bg-slate-200 text-slate-400 text-sm font-medium py-2.5 rounded-lg mb-2 cursor-not-allowed">Place Order</button>
                                <button disabled className="w-full bg-slate-100 text-slate-400 text-sm font-medium py-2.5 rounded-lg cursor-not-allowed border border-slate-200">Message Seller</button>

                                {/* <!-- Overlay prompt --> */}
                                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900 mb-1">Login or Sign Up to Continue</p>
                                    <p className="text-xs text-slate-500 mb-4">Unlock seller contact, messaging, and ordering.</p>
                                    <div className="flex gap-2">
                                        <a href="#" className="text-xs font-semibold border border-slate-300 text-slate-700 rounded-lg px-4 py-2 hover:bg-slate-50">Login</a>
                                        <a href="#" className="text-xs font-semibold bg-emerald-600 text-white rounded-lg px-4 py-2 hover:bg-emerald-700">Sign Up</a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-6 relative overflow-hidden">
                                <h2 className="text-sm font-semibold text-slate-900 mb-4">Seller Information</h2>
                                <div className="flex items-center gap-3 mb-4 blur-[3px] select-none">
                                    <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover" alt="Seller" />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Seller Name Hidden</p>
                                        <p className="text-xs text-slate-500">Verified Seller</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                    <p className="text-xs font-medium text-slate-500">Sign up to view seller details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default GuestsListingDetail
