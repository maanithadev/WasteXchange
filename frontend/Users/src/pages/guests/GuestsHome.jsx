
const GuestsHome = () => {
    return (
        <>
            {/* <!-- GUEST LANDING PAGE --> */}
            <main class="bg-white">
                {/* <!-- Hero --> */}
                <section class="px-6 lg:px-10 pt-20 pb-24 bg-gradient-to-b from-emerald-50 to-white">
                    <div class="max-w-4xl mx-auto text-center">
                        <span class="inline-block text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full mb-5">Industrial Waste Exchange Marketplace</span>
                        <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">Turn Industrial Waste Into Value</h1>
                        <p class="text-lg text-slate-600 mt-5 max-w-2xl mx-auto">WasteXchange connects waste producers with buyers who need reclaimed materials — powered by AI classification and smart matching, so nothing goes to landfill that doesn't have to.</p>
                        <div class="flex items-center justify-center gap-4 mt-8">
                            <a href="#" class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-3 rounded-lg">Get Started</a>
                            <a href="#" class="border border-slate-300 text-slate-700 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-slate-50">Browse Marketplace</a>
                        </div>
                    </div>
                </section>

                {/* <!-- How It Works --> */}
                <section class="px-6 lg:px-10 py-20">
                    <div class="max-w-6xl mx-auto">
                        <div class="text-center mb-14">
                            <h2 class="text-3xl font-bold text-slate-900">How It Works</h2>
                            <p class="text-sm text-slate-500 mt-2">Four simple steps to turn waste into opportunity</p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div class="text-center">
                                <div class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                </div>
                                <p class="text-xs font-semibold text-emerald-600 mb-1">STEP 1</p>
                                <h3 class="text-base font-semibold text-slate-900 mb-2">Register</h3>
                                <p class="text-sm text-slate-500">Create an account as a seller or buyer in under two minutes.</p>
                            </div>

                            <div class="text-center">
                                <div class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                </div>
                                <p class="text-xs font-semibold text-emerald-600 mb-1">STEP 2</p>
                                <h3 class="text-base font-semibold text-slate-900 mb-2">Upload or Browse</h3>
                                <p class="text-sm text-slate-500">Sellers list materials, buyers search the live marketplace.</p>
                            </div>

                            <div class="text-center">
                                <div class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <p class="text-xs font-semibold text-emerald-600 mb-1">STEP 3</p>
                                <h3 class="text-base font-semibold text-slate-900 mb-2">Match</h3>
                                <p class="text-sm text-slate-500">Our AI scores compatibility and surfaces the best-fit matches.</p>
                            </div>

                            <div class="text-center">
                                <div class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                                    <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a4 4 0 00-8 0v2m-2 0h12a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2z" /></svg>
                                </div>
                                <p class="text-xs font-semibold text-emerald-600 mb-1">STEP 4</p>
                                <h3 class="text-base font-semibold text-slate-900 mb-2">Exchange</h3>
                                <p class="text-sm text-slate-500">Message, agree on terms, and complete the transaction securely.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Features --> */}
                <section class="px-6 lg:px-10 py-20 bg-slate-50">
                    <div class="max-w-6xl mx-auto">
                        <div class="text-center mb-14">
                            <h2 class="text-3xl font-bold text-slate-900">Built for the Circular Economy</h2>
                            <p class="text-sm text-slate-500 mt-2">Everything you need to buy and sell industrial waste with confidence</p>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div class="bg-white rounded-xl border border-slate-200 p-6">
                                <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 mb-2">AI Classification</h3>
                                <p class="text-sm text-slate-500">Automatic waste type detection with confidence scoring on every upload.</p>
                            </div>

                            <div class="bg-white rounded-xl border border-slate-200 p-6">
                                <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 mb-2">Buyer Matching</h3>
                                <p class="text-sm text-slate-500">Smart match scoring connects listings with the buyers most likely to want them.</p>
                            </div>

                            <div class="bg-white rounded-xl border border-slate-200 p-6">
                                <div class="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                                    <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" /></svg>
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 mb-2">Carbon Tracking</h3>
                                <p class="text-sm text-slate-500">See the CO2 impact of every transaction on both sides of the exchange.</p>
                            </div>

                            <div class="bg-white rounded-xl border border-slate-200 p-6">
                                <div class="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-4">
                                    <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 mb-2">Real-Time Messaging</h3>
                                <p class="text-sm text-slate-500">Negotiate directly with buyers or sellers through built-in chat.</p>
                            </div>

                            <div class="bg-white rounded-xl border border-slate-200 p-6">
                                <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                                    <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 mb-2">Secure Payments</h3>
                                <p class="text-sm text-slate-500">Encrypted, escrow-backed transactions from order to delivery.</p>
                            </div>

                            <div class="bg-white rounded-xl border border-slate-200 p-6">
                                <div class="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center mb-4">
                                    <svg class="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                                </div>
                                <h3 class="text-sm font-semibold text-slate-900 mb-2">Verified Listings</h3>
                                <p class="text-sm text-slate-500">Every listing is reviewed and tagged for quality and accuracy.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <!-- Stats / Impact --> */}
                <section class="px-6 lg:px-10 py-20">
                    <div class="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        <div>
                            <p class="text-4xl font-bold text-emerald-600">48,200t</p>
                            <p class="text-sm text-slate-500 mt-2">Waste Diverted from Landfill</p>
                        </div>
                        <div>
                            <p class="text-4xl font-bold text-emerald-600">1,340</p>
                            <p class="text-sm text-slate-500 mt-2">Companies Onboard</p>
                        </div>
                        <div>
                            <p class="text-4xl font-bold text-emerald-600">21,600t</p>
                            <p class="text-sm text-slate-500 mt-2">CO2e Saved</p>
                        </div>
                        <div>
                            <p class="text-4xl font-bold text-emerald-600">9,850</p>
                            <p class="text-sm text-slate-500 mt-2">Successful Exchanges</p>
                        </div>
                    </div>
                </section>

                {/* <!-- Closing CTA --> */}
                <section class="px-6 lg:px-10 py-20 bg-emerald-700">
                    <div class="max-w-3xl mx-auto text-center">
                        <h2 class="text-3xl font-bold text-white">Ready to Join the Circular Economy?</h2>
                        <p class="text-sm text-emerald-100 mt-3">Sign up free and start listing or sourcing industrial materials today.</p>
                        <a href="#" class="inline-block mt-7 bg-white text-emerald-700 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-emerald-50">Create Your Free Account</a>
                    </div>
                </section>
            </main>
        </>
    )
}

export default GuestsHome
