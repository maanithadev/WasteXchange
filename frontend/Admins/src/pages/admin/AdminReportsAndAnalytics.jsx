import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AdminReportsAndAnalytics = () => {
  const [filter, setFilter] = useState("Year to Date");
  const [chartData, setChartData] = useState({ wasteData: [], carbonData: [], userData: [] });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_GET_ADMIN_REPORTS_URL}?filter=${filter}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        setChartData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, [filter]);
  return (
    <>
      {/* <!-- REPORTS & ANALYTICS PAGE --> */}
      <main class="flex-1 p-8 bg-slate-50 min-h-screen">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">Reports &amp; Analytics</h1>
            <p class="text-sm text-slate-500 mt-1">Platform performance across key metrics</p>
          </div>
          <div class="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last Quarter">Last Quarter</option>
              <option value="Year to Date">Year to Date</option>
            </select>
            {/* <button class="text-sm font-medium border border-slate-300 text-slate-700 rounded-lg px-4 py-2 hover:bg-slate-50">Export</button> */}
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">Waste Volume Over Time (Tons)</h2>
            <div class="w-full h-64 rounded-lg border border-slate-100 bg-white flex items-center justify-center p-2 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.wasteData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ color: '#0F172A', fontWeight: 'bold', marginBottom: '4px' }}
                    itemStyle={{ color: '#4f46e5' }}
                    formatter={(value) => [`${value}t`, 'Waste Volume']}
                  />
                  <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#FFF' }} activeDot={{ r: 6, fill: '#4f46e5', stroke: '#FFF', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">Carbon Savings Trend (Tons)</h2>
            <div class="w-full h-64 rounded-lg border border-slate-100 bg-white flex items-center justify-center p-2 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.carbonData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ color: '#0F172A', fontWeight: 'bold', marginBottom: '4px' }}
                    itemStyle={{ color: '#10b981' }}
                    formatter={(value) => [`${value}t`, 'CO₂ Saved']}
                  />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#FFF' }} activeDot={{ r: 6, fill: '#10b981', stroke: '#FFF', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">Matching Engine Performance</h2>
            <div class="w-full h-64 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
              <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
            </div>
          </div> */}

          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">User Growth</h2>
            <div class="w-full h-64 rounded-lg border border-slate-100 bg-white flex items-center justify-center p-2 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.userData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dx={-10} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ color: '#0F172A', fontWeight: 'bold', marginBottom: '4px' }}
                    itemStyle={{ color: '#f59e0b' }}
                    formatter={(value) => [value, 'Users']}
                  />
                  <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#FFF' }} activeDot={{ r: 6, fill: '#f59e0b', stroke: '#FFF', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminReportsAndAnalytics
