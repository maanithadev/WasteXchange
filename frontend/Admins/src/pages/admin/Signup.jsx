import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Signup = () => {
    const { register, handleSubmit, formState } = useForm()

    const { errors } = formState;

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
                    navigate("/dashboard")
                    toast.success('Login successful!')
                    break
                default:
                    navigate("/");
                    break
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
            {/* <!-- REGISTER PAGE --> */}
            <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-lg">
                    <div className="bg-white rounded-xl border border-slate-200 p-8">
                        <div className="text-center mb-8">
                            <span className="text-xl font-bold text-emerald-700">WasteXchange</span>
                            <h1 className="text-xl font-bold text-slate-900 mt-4">Create Your Account</h1>
                            {/*<p className="text-sm text-slate-500 mt-1">Join the marketplace as a buyer or seller</p>*/}
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email"
                                    placeholder="you@company.com" {...register("email", { required: "Email is required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required />
                                {errors.email && <p className="text-red-600 font-medium">{errors.email?.message}</p>}
                            </div>

                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                                    <input type="password"
                                        placeholder="••••••••" {...register("password", {
                                            required: "Password is required",
                                            minLength: { value: 8, message: "Minimum Password Length is 8" },
                                        })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required />
                                    {errors.password &&
                                        <p className="text-red-600 font-medium">{errors.password?.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm
                                        Password</label>
                                    <input type="password" placeholder="••••••••" {...register("confirm_password", {
                                        required: "Confirm Password is required",
                                        minLength: { value: 8, message: "Minimum Confirm Password Length is 8" },
                                    })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        required />
                                    {errors.confirm_password &&
                                        <p className="text-red-600 font-medium">{errors.confirm_password?.message}</p>}
                                </div>
                            </div>

                            <button type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg mt-2">Create
                                Account
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 mt-6">Already have an account?
                            <Link to="/" className="font-medium text-emerald-600 hover:text-emerald-700"> Log in</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Signup
