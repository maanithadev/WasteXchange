
const SellerListingStatus = () => {
    return (
        <>
            {/* <!-- LISTING STATUS / MATCH VIEW PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-8">
                    <p className="text-xs font-medium text-emerald-600 mb-1">My Listings / Match View</p>
                    <h1 className="text-2xl font-bold text-slate-900">Shredded HDPE Pellets</h1>
                    <p className="text-sm text-slate-500 mt-1">500 kg &middot; Plastics &middot; Listed 4 days ago</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-slate-900">Matched Buyers</h2>
                        <span className="text-xs font-medium text-slate-400">4 matches found</span>
                    </div>

                    <ul className="divide-y divide-slate-100">
                        {/* <!-- Match 1 --> */}
                        <li className="py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                            <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover" alt="EcoPlast Industries" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">EcoPlast Industries</p>
                                <p className="text-xs text-slate-500">Recycled Plastics Manufacturer &middot; 12 mi away</p>
                                <div className="w-full bg-slate-100 rounded-full h-2 mt-2 max-w-xs">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: "96%"}}></div>
                                </div>
                                <p className="text-xs font-semibold text-emerald-700 mt-1">96% match</p>
                            </div>
                            <button className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shrink-0">Message Buyer</button>
                        </li>

                        {/* <!-- Match 2 --> */}
                        <li className="py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                            <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover" alt="Circular Metals Ltd." />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">Circular Metals Ltd.</p>
                                <p className="text-xs text-slate-500">Industrial Polymer Buyer &middot; 28 mi away</p>
                                <div className="w-full bg-slate-100 rounded-full h-2 mt-2 max-w-xs">
                                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: "84%"}}></div>
                                </div>
                                <p className="text-xs font-semibold text-emerald-700 mt-1">84% match</p>
                            </div>
                            <button className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shrink-0">Message Buyer</button>
                        </li>

                        {/* <!-- Match 3 --> */}
                        <li className="py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                            <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover" alt="Greenline Polymers" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">Greenline Polymers</p>
                                <p className="text-xs text-slate-500">Plastic Reprocessing Plant &middot; 35 mi away</p>
                                <div className="w-full bg-slate-100 rounded-full h-2 mt-2 max-w-xs">
                                    <div className="bg-amber-500 h-2 rounded-full" style={{width: "67%"}}></div>
                                </div>
                                <p className="text-xs font-semibold text-amber-600 mt-1">67% match</p>
                            </div>
                            <button className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shrink-0">Message Buyer</button>
                        </li>

                        {/* <!-- Match 4 --> */}
                        <li className="py-5 flex flex-col sm:flex-row sm:items-center gap-4">
                            <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover" alt="Renew Plastics Co." />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-900">Renew Plastics Co.</p>
                                <p className="text-xs text-slate-500">Packaging Materials Supplier &middot; 51 mi away</p>
                                <div className="w-full bg-slate-100 rounded-full h-2 mt-2 max-w-xs">
                                    <div className="bg-amber-500 h-2 rounded-full" style={{width: "58%"}}></div>
                                </div>
                                <p className="text-xs font-semibold text-amber-600 mt-1">58% match</p>
                            </div>
                            <button className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shrink-0">Message Buyer</button>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}

export default SellerListingStatus
