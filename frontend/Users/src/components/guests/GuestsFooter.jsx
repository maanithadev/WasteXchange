import {Outlet} from "react-router-dom";

const GuestsFooter = () => {
    return (
        <>
            <Outlet/>

            {/* <!-- PUBLIC FOOTER (GUEST) --> */}
            <footer class="w-full bg-slate-900 text-slate-300 px-6 lg:px-10 pt-14 pb-8">
                <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-slate-800">
                    <div class="md:col-span-2">
                        <span class="text-xl font-bold text-white">WasteXchange</span>
                        <p class="text-sm text-slate-400 mt-3 max-w-sm">Connecting industrial waste producers with
                            buyers to build a cleaner, more circular economy — one exchange at a time.</p>
                    </div>

                    <div>
                        <h3 class="text-sm font-semibold text-white mb-4">Company</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm text-slate-400 hover:text-white">About</a></li>
                            <li><a href="#" class="text-sm text-slate-400 hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-sm font-semibold text-white mb-4">Platform</h3>
                        <ul class="space-y-3">
                            <li><a href="#" class="text-sm text-slate-400 hover:text-white">Browse Marketplace</a></li>
                            <li><a href="#" class="text-sm text-slate-400 hover:text-white">How It Works</a></li>
                        </ul>
                    </div>
                </div>

                <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
                    <p class="text-xs text-slate-500">© 2026 WasteXchange. All rights reserved.</p>
                    <div class="flex items-center gap-6">
                        <a href="#" class="text-xs text-slate-500 hover:text-white">Privacy Policy</a>
                        <a href="#" class="text-xs text-slate-500 hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default GuestsFooter
