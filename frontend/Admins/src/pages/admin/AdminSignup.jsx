import {useForm} from "react-hook-form";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const AdminSignup = () => {
    const {register, handleSubmit} = useForm()

    const navigate = useNavigate()

    async function onSubmit(data) {
        try {
            const res = await axios.post(import.meta.env.VITE_ADMIN_BACKEND_URL + import.meta.env.VITE_ADMIN_SIGNUP, data);
            if (res.data.token) {
                localStorage.clear()
                localStorage.setItem("token", res.data.token);
            } else {
                toast.error(res.data.message)
            }

            switch (res.data.role) {
                case "admin":
                    navigate("/admin/dashboard")
                    toast.success('Login successful!')
                    break
                default:
                    navigate("/login");
                    break
            }
        } catch (err) {
            toast.error('Something went wrong! Please try again later.')
        }
    }

    return (
        <>
            {/* <!-- REGISTER PAGE --> */}
            <main class="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
                <div class="w-full max-w-lg">
                    <div class="bg-white rounded-xl border border-slate-200 p-8">
                        <div class="text-center mb-8">
                            <span class="text-xl font-bold text-emerald-700">WasteXchange</span>
                            <h1 class="text-xl font-bold text-slate-900 mt-4">Create Your Account</h1>
                            {/*<p class="text-sm text-slate-500 mt-1">Join the marketplace as a buyer or seller</p>*/}
                        </div>

                        <form class="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email" placeholder="you@company.com"
                                       class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("email")} />
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                    <input type="password" placeholder="••••••••"
                                           class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("password")} />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-slate-700 mb-2">Confirm
                                        Password</label>
                                    <input type="password" placeholder="••••••••"
                                           class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
                                </div>
                            </div>

                            <button type="submit"
                                    class="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg mt-2">Create
                                Account
                            </button>
                        </form>

                        <p class="text-center text-sm text-slate-500 mt-6">Already have an account?
                            <Link to="/login" class="font-medium text-emerald-600 hover:text-emerald-700"> Log in</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminSignup
