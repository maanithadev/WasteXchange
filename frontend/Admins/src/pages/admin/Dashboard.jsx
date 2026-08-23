import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts";
import toast from "react-hot-toast";
import timeAgo from "../../utils/timeAgo"

const Dashboard = () => {
    const [summary, setSummary] = useState({
        totalUsers: 0,
        totalSellers: 0,
        totalBuyers: 0,
        activeListings: 0,
        totalTransactions: 0,
        carbonSavedTons: 0,
        chartData: [],
        recentActivity: []
    });

    useEffect(() => {
        async function fetchSummary() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_ADMIN_DASHBOARD_SUMMARY_URL, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setSummary(res.data);
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }
        fetchSummary();
    }, []);

    const getColorForType = (type) => {
        switch (type) {
            case "order":
                return "bg-emerald-500";
            case "match":
                return "bg-indigo-500";
            case "system":
                return "bg-slate-400";
            case "admin_announcement":
                return "bg-amber-500";
            default:
                return "bg-indigo-500";
        }
    };

    return (
        <>
            {/* <!-- ADMIN DASHBOARD PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen overflow-y-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-1">Platform-wide overview and activity</p>
                </div>

                {/* <!-- Summary stat cards --> */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <p className="text-xs font-medium text-slate-500 mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-slate-900">{summary.totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <p className="text-xs font-medium text-slate-500 mb-1">Total Sellers</p>
                        <p className="text-2xl font-bold text-slate-900">{summary.totalSellers.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <p className="text-xs font-medium text-slate-500 mb-1">Total Buyers</p>
                        <p className="text-2xl font-bold text-slate-900">{summary.totalBuyers.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <p className="text-xs font-medium text-slate-500 mb-1">Active Listings</p>
                        <p className="text-2xl font-bold text-slate-900">{summary.activeListings.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <p className="text-xs font-medium text-slate-500 mb-1">Total Transactions</p>
                        <p className="text-2xl font-bold text-slate-900">{summary.totalTransactions.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-slate-200 p-4">
                        <p className="text-xs font-medium text-slate-500 mb-1">Carbon Saved</p>
                        <p className="text-2xl font-bold text-slate-900">{summary.carbonSavedTons.toLocaleString()}t</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* <!-- Chart --> */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                        <h2 className="text-sm font-semibold text-slate-900 mb-4">Platform Growth Over Time (Current
                            Year)</h2>
                        <div
                            className="w-full h-72 rounded-lg border border-slate-100 bg-white flex items-center justify-center p-2 shadow-inner">
                            {summary.chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={summary.chartData}
                                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false}
                                            tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }}
                                            dx={-10} allowDecimals={false} />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: 'none',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                                            }}
                                            labelStyle={{ color: '#0F172A', fontWeight: 'bold', marginBottom: '4px' }}
                                            itemStyle={{ color: '#0ea5e9' }}
                                            formatter={(value) => [value, 'New Users']}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3}
                                            dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#FFF' }}
                                            activeDot={{ r: 6, fill: '#0ea5e9', stroke: '#FFF', strokeWidth: 2 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-sm font-medium text-slate-400">Loading chart data...</p>
                            )}
                        </div>
                    </div>

                    {/* <!-- Activity / audit feed --> */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col max-h-[23rem]">
                        <h2 className="text-sm font-semibold text-slate-900 mb-4 shrink-0">Recent Activity</h2>
                        <div className="overflow-y-auto flex-1 pr-2">
                            <ul className="divide-y divide-slate-100">
                                {summary.recentActivity.map((activity, index) => (
                                    <li key={index} className="py-3 flex items-start gap-3">
                                        <span
                                            className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${getColorForType(activity.type)}`}></span>
                                        <div>
                                            <p className="text-xs text-slate-800 font-medium">{activity.title}</p>
                                            <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{activity.message}</p>
                                            <p className="text-[10px] text-slate-400 mt-1">{timeAgo(activity.created_at)}</p>
                                        </div>
                                    </li>
                                ))}
                                {summary.recentActivity.length === 0 && (
                                    <li className="py-4 text-center text-sm text-slate-500">No recent activity</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Dashboard;
