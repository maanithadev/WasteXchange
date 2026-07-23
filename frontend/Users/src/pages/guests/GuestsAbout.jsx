
const GuestsAbout = () => {
    return (
        <>
            {/* <!-- ABOUT / HOW IT WORKS PAGE --> */}
            <main className="bg-white">
                {/* <!-- Mission hero --> */}
                <section className="px-6 lg:px-10 pt-16 pb-14 bg-slate-50">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Our Mission</h1 >
                        <p className="text-base text-slate-600 mt-4" > WasteXchange exists to close the loop on industrial waste.We believe every byproduct has a second life — our job is to connect the company that has it with the company that needs it, quickly and transparently.</p >
                    </div >
                </section >

                {/* <!-- Process detail --> */}
                < section className="px-6 lg:px-10 py-20" >
                    <div className="max-w-5xl mx-auto" >
                        <div className="text-center mb-14" >
                            <h2 className="text-2xl font-bold text-slate-900" > How the Matching Engine Works</h2 >
                            <p className="text-sm text-slate-500 mt-2" > From upload to exchange, here's what happens behind the scenes</p>
                        </div >

                        <div className="space-y-8" >
                            <div className="flex gap-5 items-start" >
                                <div className="w-11 h-11 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0" >
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg >
                                </div >
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 mb-1">1. Sellers Upload Material Photos</h3>
                                    <p className="text-sm text-slate-500" > A seller lists a waste stream with photos, quantity, and location details.</p >
                                </div >
                            </div >

                            <div className="flex gap-5 items-start" >
                                <div className="w-11 h-11 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0" >
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg >
                                </div >
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 mb-1">2. AI Classifies the Waste Type</h3>
                                    <p className="text-sm text-slate-500" > Our model identifies material category and estimates a confidence score, so buyers know what they're getting before they ever reach out.</p>
                                </div >
                            </div >

                            <div className="flex gap-5 items-start" >
                                <div className="w-11 h-11 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0" >
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg >
                                </div >
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 mb-1">3. Matching Engine Scores Buyers</h3>
                                    <p className="text-sm text-slate-500" > Listings are matched against buyer profiles using material type, volume needs, and proximity to generate a match score.</p>
                                </div >
                            </div >

                            <div className="flex gap-5 items-start" >
                                <div className="w-11 h-11 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0" >
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg >
                                </div >
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 mb-1">4. Buyers and Sellers Connect</h3>
                                    <p className="text-sm text-slate-500" > Interested buyers message sellers directly, negotiate terms, and place an order through the platform.</p >
                                </div >
                            </div >

                            <div className="flex gap-5 items-start" >
                                <div className="w-11 h-11 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0" >
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" /></svg >
                                </div >
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 mb-1">5. Impact is Tracked Automatically</h3>
                                    <p className="text-sm text-slate-500" > Every completed exchange updates both parties' carbon footprint dashboards with real diversion and CO2e savings data.</p>
                                </div >
                            </div >
                        </div >
                    </div >
                </section >

                {/* <!-- Sustainability angle --> */}
                < section className="px-6 lg:px-10 py-20 bg-slate-50" >
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center" >
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Built for a Circular Economy</h2>
                            <p className="text-sm text-slate-600 leading-relaxed" > Every year, industrial facilities send millions of tons of usable material to landfill simply because there's no easy way to find a buyer. WasteXchange makes reuse the path of least resistance — reducing landfill dependency, cutting raw material costs, and lowering supply chain emissions for everyone involved.</p>
                        </div >
                        <div className="rounded-xl border border-slate-200 bg-white p-6" >
                            <div className="grid grid-cols-2 gap-6 text-center" >
                                <div>
                                    <p className="text-2xl font-bold text-emerald-600">48,200t</p>
                                    <p className="text-xs text-slate-500 mt-1" > Diverted from Landfill</p >
                                </div >
                                <div>
                                    <p className="text-2xl font-bold text-emerald-600">21,600t</p>
                                    <p className="text-xs text-slate-500 mt-1" > CO2e Saved</p >
                                </div >
                            </div >
                        </div >
                    </div >
                </section >

                {/* <!-- Team --> */}
                {/* <section className="px-6 lg:px-10 py-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-slate-900">Our Team</h2>
                            <p className="text-sm text-slate-500 mt-2">A small team obsessed with keeping useful material in circulation</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <div className="text-center">
                                <img src="https://placehold.co/96x96" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" alt="Team member" />
                                <p className="text-sm font-semibold text-slate-900">Dana Whitfield</p>
                                <p className="text-xs text-slate-500">Co-Founder & CEO</p>
                            </div>
                            <div className="text-center">
                                <img src="https://placehold.co/96x96" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" alt="Team member" />
                                <p className="text-sm font-semibold text-slate-900">Marcus Ilori</p>
                                <p className="text-xs text-slate-500">Co-Founder & CTO</p>
                            </div>
                            <div className="text-center">
                                <img src="https://placehold.co/96x96" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" alt="Team member" />
                                <p className="text-sm font-semibold text-slate-900">Priya Nathan</p>
                                <p className="text-xs text-slate-500">Head of Sustainability</p>
                            </div>
                            <div className="text-center">
                                <img src="https://placehold.co/96x96" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" alt="Team member" />
                                <p className="text-sm font-semibold text-slate-900">Owen Baxter</p>
                                <p className="text-xs text-slate-500">Head of Partnerships</p>
                            </div>
                        </div>
                    </div>
                </section> */}
            </main >
        </>
    )
}

export default GuestsAbout
