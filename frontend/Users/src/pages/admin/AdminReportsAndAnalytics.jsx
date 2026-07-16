
const AdminReportsAndAnalytics = () => {
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
            <select class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
            <button class="text-sm font-medium border border-slate-300 text-slate-700 rounded-lg px-4 py-2 hover:bg-slate-50">Export</button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">Waste Volume Over Time</h2>
            <div class="w-full h-64 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
              <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">Carbon Savings Trend</h2>
            <div class="w-full h-64 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
              <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">Matching Engine Performance</h2>
            <div class="w-full h-64 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
              <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h2 class="text-sm font-semibold text-slate-900 mb-4">User Growth</h2>
            <div class="w-full h-64 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
              <p class="text-sm font-medium text-slate-400">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminReportsAndAnalytics
