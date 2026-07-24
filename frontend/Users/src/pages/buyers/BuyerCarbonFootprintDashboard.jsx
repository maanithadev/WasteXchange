import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from "react-hot-toast";

const CarbonFootprintDashboard = () => {
    const [card, setCard] = useState({});

    useEffect(() => {
        async function loadCard() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_BUYER_DASHBOARD_CARDS_URL, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                setCard(res.data)
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }

        loadCard()
    }, []);

    return (
        <>
            {/* <!-- CARBON FOOTPRINT DASHBOARD PAGE (BUYER VIEW) --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Carbon Footprint</h1>
                    <p className="text-sm text-slate-500 mt-1">Track the environmental impact of your waste diversion</p>
                </div>

                {/* <!-- Summary stat cards --> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mb-8">
                    {/* Current Year Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="text-sm font-medium text-slate-500">Current Year Carbon Footprint Saved</p>
                        <div className="flex items-end gap-2 mt-1">
                            <p className="text-3xl font-bold text-slate-900">{card.currentYearCarbonSaved || 0}t</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Total emissions prevented this year</p>
                    </div>

                    {/* All-Time Card */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-sm font-medium text-slate-500">All-Time Carbon Footprint Saved</p>
                        <div className="flex items-end gap-2 mt-1">
                            <p className="text-3xl font-bold text-slate-900">{card.totalCarbonSaved || 0}t</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Total emissions prevented since registration</p>
                    </div>
                </div>

                {/* <!-- Chart section --> */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Carbon Footprint Savings Over Time (Current Year)</h2>
                    <div className="w-full h-72 rounded-lg bg-slate-50 p-2">
                        {card.chartData ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={card.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                                        labelStyle={{ color: '#0F172A', fontWeight: 'bold', marginBottom: '4px' }}
                                        itemStyle={{ color: '#0D9488' }}
                                        formatter={(value) => [`${value.toFixed(2)}t`, 'CO₂ Saved']}
                                    />
                                    <Line type="monotone" dataKey="co2Saved" stroke="#0D9488" strokeWidth={3} dot={{ r: 4, fill: '#0D9488', strokeWidth: 2, stroke: '#FFF' }} activeDot={{ r: 6, fill: '#0D9488', stroke: '#FFF', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <p className="text-sm font-medium text-slate-400">Loading chart data...</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}

export default CarbonFootprintDashboard
