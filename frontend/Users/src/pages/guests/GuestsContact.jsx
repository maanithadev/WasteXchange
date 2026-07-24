import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const GuestsContact = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(import.meta.env.VITE_ADMIN_BACKEND_URL + import.meta.env.VITE_SUBMIT_CONTACT_URL, data);
            toast.success(res.data.message || "Message sent successfully!");
            reset();
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                toast.error("Too many requests, please try again later.");
            } else {
                toast.error('Something went wrong! Please try again later.');
            }
        }
    };

    return (
        <>
            {/* <!-- CONTACT / SUPPORT PAGE --> */}
            <main className="bg-white px-6 lg:px-10 py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-slate-900">Get in Touch</h1>
                        <p className="text-sm text-slate-500 mt-2">Have a question or need help? We'd love to hear from you.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                        {/* <!-- Contact form --> */}
                        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                    />
                                    {errors.name && <p className="text-red-600 font-medium">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        {...register("email", { required: "Email is required" })}
                                        className={`w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                    />
                                    {errors.email && <p className="text-red-600 font-medium">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <input
                                    type="text"
                                    placeholder="What's this about?"
                                    {...register("subject", { required: "Subject is required" })}
                                    className={`w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                />
                                {errors.subject && <p className="text-red-600 font-medium">{errors.subject.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea
                                    rows="6"
                                    placeholder="Tell us how we can help..."
                                    {...register("message", { required: "Message is required" })}
                                    className={`w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                                ></textarea>
                                {errors.message && <p className="text-red-600 font-medium">{errors.message.message}</p>}
                            </div>

                            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg">Send Message</button>
                        </form>

                        {/* <!-- Contact details --> */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Email</p>
                                    <p className="text-sm text-slate-500">support@wastexchange.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Phone</p>
                                    <p className="text-sm text-slate-500">+1(800) 555 -0199</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Address</p>
                                    <p className="text-sm text-slate-500">400 Circular Way, Suite 200<br />Newark, NJ 07105</p>
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

