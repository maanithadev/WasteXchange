
const BuyerMatchedRecommendations = () => {
    return (
        <>
            {/* <!-- MATCHED RECOMMENDATIONS PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Matched Recommendations</h1>
                    <p className="text-sm text-slate-500 mt-1">AI-suggested listings tailored to your buying profile</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-40 object-cover" alt="Shredded HDPE Pellets" />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Shredded HDPE Pellets</h3>
                            <p className="text-xs text-slate-400 mb-3">Sold by Green Metals Co.</p>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                <div className="bg-blue-500 h-2 rounded-full" style={{width: "91%"}}></div>
                            </div>
                            <p className="text-xs font-semibold text-blue-700 mb-3">91% match</p>
                            <button className="w-full text-xs font-medium bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">View Details</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-40 object-cover" alt="Scrap Aluminum Sheets" />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Scrap Aluminum Sheets</h3>
                            <p className="text-xs text-slate-400 mb-3">Sold by MetalWorks Recycling</p>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                <div className="bg-blue-500 h-2 rounded-full" style={{width: "87%"}}></div>
                            </div>
                            <p className="text-xs font-semibold text-blue-700 mb-3">87% match</p>
                            <button className="w-full text-xs font-medium bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">View Details</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-40 object-cover" alt="E-Waste Circuit Boards" />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">E-Waste Circuit Boards</h3>
                            <p className="text-xs text-slate-400 mb-3">Sold by CircuitCycle Ltd.</p>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                <div className="bg-amber-500 h-2 rounded-full" style={{width: "73%"}}></div>
                            </div>
                            <p className="text-xs font-semibold text-amber-600 mb-3">73% match</p>
                            <button className="w-full text-xs font-medium bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">View Details</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-40 object-cover" alt="Wood Offcuts" />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Wood Offcuts – Grade A</h3>
                            <p className="text-xs text-slate-400 mb-3">Sold by Wood Reclaim Co.</p>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                <div className="bg-amber-500 h-2 rounded-full" style={{width: "65%"}}></div>
                            </div>
                            <p className="text-xs font-semibold text-amber-600 mb-3">65% match</p>
                            <button className="w-full text-xs font-medium bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">View Details</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-40 object-cover" alt="Cotton Textile Scraps" />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Cotton Textile Scraps</h3>
                            <p className="text-xs text-slate-400 mb-3">Sold by Fabric Loop Inc.</p>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                <div className="bg-blue-500 h-2 rounded-full" style={{width: "82%"}}></div>
                            </div>
                            <p className="text-xs font-semibold text-blue-700 mb-3">82% match</p>
                            <button className="w-full text-xs font-medium bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">View Details</button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-40 object-cover" alt="Concrete Rubble" />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 text-sm mb-1">Concrete Rubble</h3>
                            <p className="text-xs text-slate-400 mb-3">Sold by Site Clear Corp.</p>
                            <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                <div className="bg-amber-500 h-2 rounded-full" style={{width: "59%"}}></div>
                            </div>
                            <p className="text-xs font-semibold text-amber-600 mb-3">59% match</p>
                            <button className="w-full text-xs font-medium bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">View Details</button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BuyerMatchedRecommendations
