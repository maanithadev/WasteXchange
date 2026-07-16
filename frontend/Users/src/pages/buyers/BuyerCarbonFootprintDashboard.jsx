
const BuyerCarbonFootprintDashboard = () => {
    return (
        <>
            {/* <!-- CARBON FOOTPRINT DASHBOARD PAGE (BUYER VIEW) --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Carbon Footprint</h1>
                    <p class="text-sm text-slate-500 mt-1">Track the environmental impact of your material purchases</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Total CO2 Offset</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">3.1t</p>
                        <p class="text-xs text-blue-600 mt-1">+0.4t this month</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Waste Diverted via Purchases</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">9.6t</p>
                        <p class="text-xs text-blue-600 mt-1">+1.1t this month</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Materials Sourced</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">14</p>
                        <p class="text-xs text-slate-400 mt-1">Across 5 categories</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Equivalent Trees Planted</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">71</p>
                        <p class="text-xs text-slate-400 mt-1">Estimated equivalent</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 class="text-lg font-semibold text-slate-900 mb-4">CO2 Offset Over Time</h2>
                    <div class="w-full h-72 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                        <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BuyerCarbonFootprintDashboard
