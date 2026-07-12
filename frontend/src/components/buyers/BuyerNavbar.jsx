import {Outlet} from "react-router-dom";

const BuyerNavbar = () => {
    return (
        <>
            {/* <!-- SHARED NAVBAR / TOPBAR COMPONENT (BUYER) --> */}
            <header class="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6">
                <div class="flex items-center gap-2">
                    <span class="text-lg font-bold text-blue-700">WasteXchange</span>
                    <span class="text-xs font-medium text-slate-400 border-l border-slate-200 pl-2 ml-1">Buyer Portal</span>
                </div>

                <div class="flex items-center gap-5">
                    <button class="relative text-slate-500 hover:text-slate-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span class="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">2</span>
                    </button>

                    <button class="relative text-slate-500 hover:text-slate-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <span class="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-blue-500 text-white text-[10px] font-bold">4</span>
                    </button>

                    <button class="flex items-center gap-2 pl-3 border-l border-slate-200">
                        <img src="https://placehold.co/32x32" class="w-8 h-8 rounded-full object-cover" alt="User avatar" />
                        <span class="text-sm font-medium text-slate-700">EcoPlast Industries</span>
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </header>

            <Outlet/>
        </>
    )
}

export default BuyerNavbar
