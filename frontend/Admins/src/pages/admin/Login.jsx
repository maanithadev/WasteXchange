import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit } = useForm({
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

            if (res.data?.token) {
                localStorage.clear()
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard")
                toast.success('Login successful!')
            }
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                toast.error("Too many requests, please try again later.")
            } else {
                toast.error('Something went wrong! Please try again later.')
            }
        }
    }

    return (
        <>
            {/* <!-- LOGIN PAGE --> */}
            <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-xl border border-slate-200 p-8">
                        <div className="text-center mb-8">
                            <span className="text-xl font-bold text-emerald-700">WasteXchange</span>
                            <h1 className="text-xl font-bold text-slate-900 mt-4">Welcome Back</h1>
                            <p className="text-sm text-slate-500 mt-1">Log in to your account to continue</p>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email" placeholder="you@company.com"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register('email')} />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-slate-700">Password</label>
                                    <Link to="/forgot-password" className="text-xs font-medium text-emerald-600 hover:text-emerald-700">Forgot
                                        Password?</Link>
                                </div>
                                <input type="password" placeholder="••••••••"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register('password')} />
                            </div>

                            <button type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg">Log
                                In
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 mt-6">Don't have an account?
                            <Link to="/signup" className="font-medium text-emerald-600 hover:text-emerald-700"> Sign
                                up</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login
