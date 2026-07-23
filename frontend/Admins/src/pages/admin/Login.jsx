import {useForm} from "react-hook-form";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const res = await axios.post(import.meta.env.VITE_ADMIN_BACKEND_URL + import.meta.env.VITE_ADMIN_LOGIN, data);

            if (res.data?.message) {
                toast.error(res.data?.message);
            }

            if (res.data?.status === "pending") {
                toast.error('Your Account is still Pending for Approve');
            }

            if (res.data?.role === "need to assign") {
                toast.error("Your Account haven't assigned a role yet");
            }

            if (res.data?.token) {
                localStorage.clear()
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard")
                toast.success('Login successful!')
            }

        } catch (err) {
            toast.error('Something went wrong! Please try again later.')
        }
    }

    return (
        <>
            {/* <!-- LOGIN PAGE --> */}
            <main class="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
                <div class="w-full max-w-md">
                    <div class="bg-white rounded-xl border border-slate-200 p-8">
                        <div class="text-center mb-8">
                            <span class="text-xl font-bold text-emerald-700">WasteXchange</span>
                            <h1 class="text-xl font-bold text-slate-900 mt-4">Welcome Back</h1>
                            <p class="text-sm text-slate-500 mt-1">Log in to your account to continue</p>
                        </div>

                        <form class="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email" placeholder="you@company.com"
                                       class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register('email')} />
                            </div>

                            <div>
                                <div class="flex items-center justify-between mb-2">
                                    <label class="block text-sm font-medium text-slate-700">Password</label>
                                    <a href="#" class="text-xs font-medium text-emerald-600 hover:text-emerald-700">Forgot
                                        Password?</a>
                                </div>
                                <input type="password" placeholder="••••••••"
                                       class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register('password')} />
                            </div>

                            <button type="submit"
                                    class="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg">Log
                                In
                            </button>
                        </form>

                        <p class="text-center text-sm text-slate-500 mt-6">Don't have an account?
                            <Link to="/signup" class="font-medium text-emerald-600 hover:text-emerald-700"> Sign
                                up</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
