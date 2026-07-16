
const AdminNavbar = () => {
    return (
        <>
            {/* <!-- SHARED NAVBAR / TOPBAR COMPONENT (ADMIN) --> */}
            <header class="h-16 w-full bg-white border-b border-slate-200 flex items-center justify-between px-6">
                <div class="flex items-center gap-2">
                    <span class="text-lg font-bold text-slate-900">WasteXchange</span>
                    <span class="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full ml-1">Admin Panel</span>
                </div>

                <div class="flex items-center gap-5">
                    <button class="relative text-slate-500 hover:text-slate-700">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span class="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">7</span>
                    </button>

                    <button class="flex items-center gap-2 pl-3 border-l border-slate-200">
                        <img src="https://placehold.co/32x32" class="w-8 h-8 rounded-full object-cover" alt="Admin avatar" />
                        <div class="flex flex-col items-start">
                            <span class="text-sm font-medium text-slate-700 leading-tight">Alex Rivera</span>
                            <span class="text-[10px] font-semibold text-indigo-600 leading-tight">Admin</span>
                        </div>
                        <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
            </header>
        </>
    )
}

export default AdminNavbar
