
const BuyerMessages = () => {
    return (
        <>
            {/* <!-- MESSAGES / CHAT PAGE (BUYER VIEW) --> */}
            <main class="flex-1 bg-slate-50 min-h-screen flex">
                {/* <!-- Conversation list --> */}
                <div class="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
                    <div class="p-4 border-b border-slate-200">
                        <h2 class="text-lg font-bold text-slate-900">Messages</h2>
                        <input type="text" placeholder="Search conversations..." class="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <ul class="flex-1 overflow-y-auto divide-y divide-slate-100">
                        <li class="flex items-center gap-3 px-4 py-3 bg-blue-50 border-l-4 border-blue-600 cursor-pointer">
                            <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="Green Metals Co." />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-slate-900 truncate">Green Metals Co.</p>
                                <p class="text-xs text-slate-500 truncate">Sure, Thursday morning works!</p>
                            </div>
                            <span class="text-xs text-slate-400 shrink-0">2m</span>
                        </li>
                        <li class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                            <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="MetalWorks Recycling" />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-slate-900 truncate">MetalWorks Recycling</p>
                                <p class="text-xs text-slate-500 truncate">Yes, still available this week.</p>
                            </div>
                            <span class="text-xs text-slate-400 shrink-0">45m</span>
                        </li>
                        <li class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                            <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="Wood Reclaim Co." />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-slate-900 truncate">Wood Reclaim Co.</p>
                                <p class="text-xs text-slate-500 truncate">Thanks for the order!</p>
                            </div>
                            <span class="text-xs text-slate-400 shrink-0">1d</span>
                        </li>
                        <li class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                            <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="CircuitCycle Ltd." />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-semibold text-slate-900 truncate">CircuitCycle Ltd.</p>
                                <p class="text-xs text-slate-500 truncate">Can you send the pickup address?</p>
                            </div>
                            <span class="text-xs text-slate-400 shrink-0">3d</span>
                        </li>
                    </ul>
                </div>

                {/* <!-- Chat window --> */}
                <div class="flex-1 flex flex-col">
                    <div class="h-16 flex items-center gap-3 px-6 border-b border-slate-200 bg-white">
                        <img src="https://placehold.co/36x36" class="w-9 h-9 rounded-full object-cover" alt="Green Metals Co." />
                        <div>
                            <p class="text-sm font-semibold text-slate-900">Green Metals Co.</p>
                            <p class="text-xs text-emerald-600">Online</p>
                        </div>
                    </div>

                    <div class="flex-1 overflow-y-auto p-6 space-y-4">
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Hi! Is the Shredded HDPE Pellets listing still available?</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:02 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="max-w-xs bg-blue-600 rounded-2xl rounded-br-sm px-4 py-2.5">
                                <p class="text-sm text-white">Yes, we have 500kg ready for pickup this week.</p>
                                <p class="text-[10px] text-blue-100 mt-1">10:05 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Perfect. What's the purity level on the pellets?</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:07 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-end">
                            <div class="max-w-xs bg-blue-600 rounded-2xl rounded-br-sm px-4 py-2.5">
                                <p class="text-sm text-white">Around 98% purity, minimal contamination. I can send photos.</p>
                                <p class="text-[10px] text-blue-100 mt-1">10:09 AM</p>
                            </div>
                        </div>
                        <div class="flex justify-start">
                            <div class="max-w-xs bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5">
                                <p class="text-sm text-slate-800">Sure, Thursday morning works!</p>
                                <p class="text-[10px] text-slate-400 mt-1">10:12 AM</p>
                            </div>
                        </div>
                    </div>

                    <div class="border-t border-slate-200 bg-white p-4 flex items-center gap-3">
                        <button class="text-slate-400 hover:text-slate-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                        </button>
                        <input type="text" placeholder="Type a message..." class="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BuyerMessages
