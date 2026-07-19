import { useEffect, useState } from "react";
import axios from "axios";

const CarbonFootprintDashboard = () => {
    const [card, setCard] = useState({});

    useEffect(() => {
        async function loadCard() {
            const res = await axios.get(import.meta.env.VITE_GET_SELLER_DASHBOARD_CARDS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setCard(res.data)
        }

        loadCard()
    }, []);

    return (
        <>
            {/* <!-- CARBON FOOTPRINT DASHBOARD PAGE (SELLER VIEW) --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Carbon Footprint</h1>
                    <p class="text-sm text-slate-500 mt-1">Track the environmental impact of your waste diversion</p>
                </div>

                {/* <!-- Summary stat cards --> */}
                {/* <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"> */}
                <div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 mb-8">
                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Total Carbon Saved</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">{card.totalCarbonSaved}t</p>
                        {/* <p class="text-xs text-emerald-600 mt-1">+0.6t this month</p> */}
                    </div>

                    {/* <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Waste Diverted from Landfill</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">12.8t</p>
                        <p class="text-xs text-emerald-600 mt-1">+1.4t this month</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Materials Recycled</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">18</p>
                        <p class="text-xs text-slate-400 mt-1">Across 6 categories</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <p class="text-sm font-medium text-slate-500">Equivalent Trees Planted</p>
                        <p class="text-3xl font-bold text-slate-900 mt-1">96</p>
                        <p class="text-xs text-slate-400 mt-1">Estimated equivalent</p>
                    </div> */}
                </div>

                {/* <!-- Chart placeholder --> */}
                <div class="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 class="text-lg font-semibold text-slate-900 mb-4">CO2 Savings Over Time</h2>
                    <div class="w-full h-72 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                        <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default CarbonFootprintDashboard
