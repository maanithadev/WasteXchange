
const BuyerSettings = () => {
    return (
        <>
            {/* <!-- PROFILE / ACCOUNT SETTINGS PAGE (BUYER) --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Profile &amp; Account Settings</h1>
                    <p class="text-sm text-slate-500 mt-1">Manage your company profile and account preferences</p>
                </div>

                <div class="max-w-2xl space-y-6">
                    <form class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                        <h2 class="text-lg font-semibold text-slate-900">Company Information</h2>

                        <div class="flex items-center gap-4">
                            <img src="https://placehold.co/64x64" class="w-16 h-16 rounded-full object-cover" alt="Company avatar" />
                            <button type="button" class="text-xs font-medium border border-slate-300 text-slate-700 rounded-lg px-3 py-2 hover:bg-slate-50">Change Logo</button>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                            <input type="text" value="EcoPlast Industries" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
                            <input type="email" value="contact@ecoplastind.com" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                            <input type="tel" value="+1 (555) 987-6543" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Address</label>
                            <input type="text" value="88 Recycling Blvd, Camden, NJ 08102" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div class="flex justify-end pt-2">
                            <button type="submit" class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Save Changes</button>
                        </div>
                    </form>

                    <form class="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
                        <h2 class="text-lg font-semibold text-slate-900">Change Password</h2>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                            <input type="password" placeholder="••••••••" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                            <input type="password" placeholder="••••••••" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                            <input type="password" placeholder="••••••••" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div class="flex justify-end pt-2">
                            <button type="submit" class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Update Password</button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default BuyerSettings
