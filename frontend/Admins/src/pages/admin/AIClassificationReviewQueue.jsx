
const AIclassNameificationReviewQueue = () => {
    return (
        <>
            {/* <!-- AI classNameIFICATION REVIEW QUEUE PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">AI classNameification Review Queue</h1>
                    <p className="text-sm text-slate-500 mt-1">Listings where AI confidence fell below the 80% threshold</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-36 object-cover" alt="Unlabeled waste sample" />
                        <div className="p-4">
                            <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 mb-3">
                                <p className="text-xs text-slate-500 mb-1">AI Prediction</p>
                                <p className="text-sm font-semibold text-slate-900">67% confident: Plastic Waste</p>
                                <div className="w-full bg-white rounded-full h-1.5 mt-2 border border-amber-100">
                                    <div className="bg-amber-500 h-1.5 rounded-full" style={{width: "67%"}}></div>
                                </div>
                            </div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">Correct Category</label>
                            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Plastics</option>
                                <option>Metals</option>
                                <option>Wood</option>
                                <option>Textiles</option>
                                <option>Electronics</option>
                            </select>
                            <div className="flex gap-2">
                                <button className="flex-1 text-xs font-medium bg-emerald-600 text-white rounded-md py-2 hover:bg-emerald-700">Confirm</button>
                                <button className="flex-1 text-xs font-medium border border-slate-300 text-slate-600 rounded-md py-2 hover:bg-slate-50">Correct</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-36 object-cover" alt="Unlabeled waste sample" />
                        <div className="p-4">
                            <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 mb-3">
                                <p className="text-xs text-slate-500 mb-1">AI Prediction</p>
                                <p className="text-sm font-semibold text-slate-900">58% confident: Mixed Metals</p>
                                <div className="w-full bg-white rounded-full h-1.5 mt-2 border border-amber-100">
                                    <div className="bg-amber-500 h-1.5 rounded-full" style={{width: "58%"}}></div>
                                </div>
                            </div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">Correct Category</label>
                            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Metals</option>
                                <option>Plastics</option>
                                <option>Wood</option>
                                <option>Textiles</option>
                                <option>Electronics</option>
                            </select>
                            <div className="flex gap-2">
                                <button className="flex-1 text-xs font-medium bg-emerald-600 text-white rounded-md py-2 hover:bg-emerald-700">Confirm</button>
                                <button className="flex-1 text-xs font-medium border border-slate-300 text-slate-600 rounded-md py-2 hover:bg-slate-50">Correct</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <img src="https://placehold.co/400x220" className="w-full h-36 object-cover" alt="Unlabeled waste sample" />
                        <div className="p-4">
                            <div className="rounded-lg bg-amber-50 border border-amber-100 p-3 mb-3">
                                <p className="text-xs text-slate-500 mb-1">AI Prediction</p>
                                <p className="text-sm font-semibold text-slate-900">72% confident: Textile Scraps</p>
                                <div className="w-full bg-white rounded-full h-1.5 mt-2 border border-amber-100">
                                    <div className="bg-amber-500 h-1.5 rounded-full" style={{width: "72%"}}></div>
                                </div>
                            </div>
                            <label className="block text-xs font-medium text-slate-600 mb-1.5">Correct Category</label>
                            <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Textiles</option>
                                <option>Plastics</option>
                                <option>Wood</option>
                                <option>Metals</option>
                                <option>Electronics</option>
                            </select>
                            <div className="flex gap-2">
                                <button className="flex-1 text-xs font-medium bg-emerald-600 text-white rounded-md py-2 hover:bg-emerald-700">Confirm</button>
                                <button className="flex-1 text-xs font-medium border border-slate-300 text-slate-600 rounded-md py-2 hover:bg-slate-50">Correct</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AIclassNameificationReviewQueue
