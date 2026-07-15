
const SellerMessages = () => {
    return (
        <>
            {/* <!-- MESSAGES / CHAT PAGE (SELLER VIEW) --> */}
            <main className="flex-1 bg-slate-50 h-[calc(100vh-4rem)] flex overflow-hidden">
                {/* <!-- Conversation list --> */}
                <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
                    <div class="p-4 border-b border-slate-200">
                        <h2 class="text-lg font-bold text-slate-900">Messages</h2>
                        <input type="text" placeholder="Search conversations..." class="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <ul class="flex-1 overflow-y-auto divide-y divide-slate-100">
                        <li class="flex items-center gap-3 px-4 py-3 bg-emerald-50 border-l-4 border-emerald-600 cursor-pointer">
                            <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="EcoPlast Industries" />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-slate-900 truncate">EcoPlast Industries</p>
                                <p class="text-xs text-slate-500 truncate">Great, we can pick up Thursday...</p>
                            </div>
                            <span class="text-xs text-slate-400 shrink-0">2m</span>
                        </li>
                        <li class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                            <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="Circular Metals Ltd." />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-slate-900 truncate">Circular Metals Ltd.</p>
                                <p class="text-xs text-slate-500 truncate">Can you confirm the purity %?</p>
                            </div>
                            <span class="text-xs text-slate-400 shrink-0">1h</span>
                        </li>
                        <li class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                            <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="Greenline Polymers" />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-slate-900 truncate">Greenline Polymers</p>
                                <p class="text-xs text-slate-500 truncate">Thanks for the quick delivery!</p>
                            </div>
                            <span class="text-xs text-slate-400 shrink-0">1d</span>
                        </li>
                    </ul>
                </div>

                {/* <!-- Chat window --> */}
                <div class="flex-1 flex flex-col">
                    {/* <!-- Chat header --> */}
                    <div class="h-16 flex items-center gap-3 px-6 border-b border-slate-200 bg-white">
                        <img src="https://placehold.co/36x36" class="w-9 h-9 rounded-full object-cover" alt="EcoPlast Industries" />
                        <div>
                            <p class="text-sm font-semibold text-slate-900">EcoPlast Industries</p>
                            <p class="text-xs text-emerald-600">Online</p>
                        </div>
                    </div>

                    {/* <!-- Messages --> */}
                    <div class="flex-1 overflow-y-auto p-6 space-y-4">
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Hi! Is the Shredded HDPE Pellets listing still available?</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:02 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="max-w-xs bg-emerald-600 rounded-2xl rounded-br-sm px-4 py-2.5">
                                <p class="text-sm text-white">Yes, we have 500kg ready for pickup this week.</p>
                                <p class="text-[10px] text-emerald-100 mt-1">10:05 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Perfect. What's the purity level on the pellets?</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:07 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="max-w-xs bg-emerald-600 rounded-2xl rounded-br-sm px-4 py-2.5">
                                <p class="text-sm text-white">Yes, we have 500kg ready for pickup this week.</p>
                                <p class="text-[10px] text-emerald-100 mt-1">10:05 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Perfect. What's the purity level on the pellets?</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:07 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="max-w-xs bg-emerald-600 rounded-2xl rounded-br-sm px-4 py-2.5">
                                <p class="text-sm text-white">Yes, we have 500kg ready for pickup this week.</p>
                                <p class="text-[10px] text-emerald-100 mt-1">10:05 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Perfect. What's the purity level on the pellets?</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:07 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Great, we can pick up Thursday morning if that works.</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:12 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Message input bar --> */}
                    <div class="border-t border-slate-200 bg-white p-4 flex items-center gap-3">
                        <button class="text-slate-400 hover:text-slate-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        </button>
                        <input type="text" placeholder="Type a message..." class="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        <button class="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SellerMessages
