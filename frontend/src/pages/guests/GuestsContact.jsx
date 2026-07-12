
const GuestsContact = () => {
    return (
        <>
            {/* <!-- CONTACT / SUPPORT PAGE --> */}
            <main class="bg-white px-6 lg:px-10 py-16">
                <div class="max-w-5xl mx-auto">
                    <div class="text-center mb-12">
                        <h1 class="text-3xl font-bold text-slate-900">Get in Touch</h1>
                        <p class="text-sm text-slate-500 mt-2">Have a question or need help? We'd love to hear from you.</p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        {/* <!-- Contact form --> */}
                        <form class="lg:col-span-3 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-5">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                    <input type="text" placeholder="Your name" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <input type="email" placeholder="you@company.com" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <input type="text" placeholder="What's this about?" class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea rows="6" placeholder="Tell us how we can help..." class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                            </div>

                            <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg">Send Message</button>
                        </form>

                        {/* <!-- Contact details --> */}
                        <div class="lg:col-span-2 space-y-6">
                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-slate-900">Email</p>
                                    <p class="text-sm text-slate-500">support@wastexchange.com</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-slate-900">Phone</p>
                                    <p class="text-sm text-slate-500">+1 (800) 555-0199</p>
                                </div>
                            </div>

                            <div class="flex items-start gap-4">
                                <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                </div>
                                <div>
                                    <p class="text-sm font-semibold text-slate-900">Address</p>
                                    <p class="text-sm text-slate-500">400 Circular Way, Suite 200<br />Newark, NJ 07105</p>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-slate-200">
                                <p class="text-sm font-semibold text-slate-900 mb-3">Follow Us</p>
                                <div class="flex items-center gap-3">
                                    <a href="#" class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                                        <svg class="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                                    </a>
                                    <a href="#" class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                                        <svg class="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18.34V10.1H5.67v8.24h2.67zM7 8.94a1.55 1.55 0 100-3.1 1.55 1.55 0 000 3.1zm11.34 9.4v-4.52c0-2.42-1.29-3.55-3.02-3.55-1.39 0-2.01.77-2.36 1.3v-1.11h-2.67v8.24h2.67v-4.6c0-.24.02-.48.09-.66.2-.48.65-.99 1.4-.99.99 0 1.39.75 1.39 1.86v4.39h2.67z" /></svg>
                                    </a>
                                    <a href="#" class="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200">
                                        <svg class="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.14 12.14 0 013 4.9a4.28 4.28 0 001.32 5.71 4.25 4.25 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54a12.13 12.13 0 006.56 1.92c7.87 0 12.18-6.52 12.18-12.18 0-.19 0-.37-.01-.55A8.7 8.7 0 0022.46 6z" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default GuestsContact
