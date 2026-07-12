
const GuestsBrowseMarketplace = () => {
    return (
        <>
            {/* <!-- BROWSE MARKETPLACE PAGE (GUEST, READ-ONLY VIEW) --> */}
            <main class="bg-slate-50 min-h-screen">
                {/* <!-- Sign-up banner --> */}
                <div class="bg-emerald-600 px-6 py-3 flex items-center justify-center gap-3 text-center">
                    <svg class="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    <p class="text-sm text-white font-medium">Sign up to view full details and contact sellers.</p>
                    <a href="#" class="text-xs font-semibold bg-white text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-50">Sign Up Free</a>
                </div>

                <div class="px-6 lg:px-10 py-10 max-w-6xl mx-auto">
                    <div class="mb-8">
                        <h1 class="text-2xl font-bold text-slate-900">Browse Marketplace</h1>
                        <p class="text-sm text-slate-500 mt-1">42 active listings across the platform</p>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                            <img src="https://placehold.co/400x220" class="w-full h-40 object-cover" alt="Shredded HDPE Pellets" />
                            <div class="p-4">
                                <h3 class="font-semibold text-slate-900 text-sm mb-1">Shredded HDPE Pellets</h3>
                                <p class="text-xs text-slate-500 mb-1">500 kg &middot; Plastics</p>
                                <p class="text-xs text-slate-400 mb-3">Newark, NJ area</p>
                                <div class="h-3 w-24 bg-slate-200 rounded blur-[2px] mb-3"></div>
                                <a href="#" class="block w-full text-center text-xs font-medium bg-slate-100 text-slate-500 rounded-lg py-2 cursor-not-allowed">Sign Up to View</a>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                            <img src="https://placehold.co/400x220" class="w-full h-40 object-cover" alt="Scrap Aluminum Sheets" />
                            <div class="p-4">
                                <h3 class="font-semibold text-slate-900 text-sm mb-1">Scrap Aluminum Sheets</h3>
                                <p class="text-xs text-slate-500 mb-1">1.2 tons &middot; Metals</p>
                                <p class="text-xs text-slate-400 mb-3">Chicago, IL area</p>
                                <div class="h-3 w-28 bg-slate-200 rounded blur-[2px] mb-3"></div>
                                <a href="#" class="block w-full text-center text-xs font-medium bg-slate-100 text-slate-500 rounded-lg py-2 cursor-not-allowed">Sign Up to View</a>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                            <img src="https://placehold.co/400x220" class="w-full h-40 object-cover" alt="Wood Offcuts" />
                            <div class="p-4">
                                <h3 class="font-semibold text-slate-900 text-sm mb-1">Wood Offcuts – Grade A</h3>
                                <p class="text-xs text-slate-500 mb-1">2.5 m³ &middot; Wood</p>
                                <p class="text-xs text-slate-400 mb-3">Portland, OR area</p>
                                <div class="h-3 w-20 bg-slate-200 rounded blur-[2px] mb-3"></div>
                                <a href="#" class="block w-full text-center text-xs font-medium bg-slate-100 text-slate-500 rounded-lg py-2 cursor-not-allowed">Sign Up to View</a>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                            <img src="https://placehold.co/400x220" class="w-full h-40 object-cover" alt="Cotton Textile Scraps" />
                            <div class="p-4">
                                <h3 class="font-semibold text-slate-900 text-sm mb-1">Cotton Textile Scraps</h3>
                                <p class="text-xs text-slate-500 mb-1">300 kg &middot; Textiles</p>
                                <p class="text-xs text-slate-400 mb-3">Atlanta, GA area</p>
                                <div class="h-3 w-24 bg-slate-200 rounded blur-[2px] mb-3"></div>
                                <a href="#" class="block w-full text-center text-xs font-medium bg-slate-100 text-slate-500 rounded-lg py-2 cursor-not-allowed">Sign Up to View</a>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                            <img src="https://placehold.co/400x220" class="w-full h-40 object-cover" alt="E-Waste Circuit Boards" />
                            <div class="p-4">
                                <h3 class="font-semibold text-slate-900 text-sm mb-1">E-Waste Circuit Boards</h3>
                                <p class="text-xs text-slate-500 mb-1">150 kg &middot; Electronics</p>
                                <p class="text-xs text-slate-400 mb-3">Austin, TX area</p>
                                <div class="h-3 w-28 bg-slate-200 rounded blur-[2px] mb-3"></div>
                                <a href="#" class="block w-full text-center text-xs font-medium bg-slate-100 text-slate-500 rounded-lg py-2 cursor-not-allowed">Sign Up to View</a>
                            </div>
                        </div>

                        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                            <img src="https://placehold.co/400x220" class="w-full h-40 object-cover" alt="Concrete Rubble" />
                            <div class="p-4">
                                <h3 class="font-semibold text-slate-900 text-sm mb-1">Concrete Rubble</h3>
                                <p class="text-xs text-slate-500 mb-1">8 tons &middot; Construction Debris</p>
                                <p class="text-xs text-slate-400 mb-3">Denver, CO area</p>
                                <div class="h-3 w-20 bg-slate-200 rounded blur-[2px] mb-3"></div>
                                <a href="#" class="block w-full text-center text-xs font-medium bg-slate-100 text-slate-500 rounded-lg py-2 cursor-not-allowed">Sign Up to View</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default GuestsBrowseMarketplace
