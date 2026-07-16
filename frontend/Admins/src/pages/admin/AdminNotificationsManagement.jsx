
const AdminNotificationsManagement = () => {
    return (
        <>
            {/* <!-- NOTIFICATIONS MANAGEMENT PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-slate-900">Notifications Management</h1>
                    <p class="text-sm text-slate-500 mt-1">Compose and send platform-wide announcements</p>
                </div>

                {/* <!-- Compose form --> */}
                <form class="bg-white rounded-xl border border-slate-200 p-6 space-y-5 mb-8 max-w-2xl">
                    <h2 class="text-sm font-semibold text-slate-900">New Announcement</h2>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Title</label>
                        <input type="text" placeholder="Announcement title" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Message</label>
                        <textarea rows="4" placeholder="Write your announcement..." class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                        <select class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option>All Users</option>
                            <option>Sellers Only</option>
                            <option>Buyers Only</option>
                        </select>
                    </div>

                    <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">Send Notification</button>
                </form>

                {/* <!-- History table --> */}
                <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-slate-200">
                        <h2 class="text-sm font-semibold text-slate-900">Notification History</h2>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="bg-slate-50 border-b border-slate-200">
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Title</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Audience</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Sent Date</th>
                                    <th class="text-left font-semibold text-slate-500 px-6 py-3 text-xs uppercase tracking-wide">Reach</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100">
                                <tr>
                                    <td class="px-6 py-3.5 font-medium text-slate-800">Scheduled Maintenance – Jul 12</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">All Users</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 7, 2026</td>
                                    <td class="px-6 py-3.5 text-slate-600">3,214 users</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5 font-medium text-slate-800">New AI Classification Model Live</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Sellers Only</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jul 3, 2026</td>
                                    <td class="px-6 py-3.5 text-slate-600">1,340 users</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5 font-medium text-slate-800">New Filter Options in Marketplace</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Buyers Only</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jun 28, 2026</td>
                                    <td class="px-6 py-3.5 text-slate-600">1,874 users</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-3.5 font-medium text-slate-800">Platform Terms Update</td>
                                    <td class="px-6 py-3.5"><span class="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">All Users</span></td>
                                    <td class="px-6 py-3.5 text-slate-500">Jun 15, 2026</td>
                                    <td class="px-6 py-3.5 text-slate-600">3,102 users</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminNotificationsManagement
