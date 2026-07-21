import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const GuestsSignup = () => {
    const wasteCategories = ["Construction", "Metals", "Wood"]
    const { register, handleSubmit } = useForm()

    const [role, setRole] = useState("seller")
    const navigate = useNavigate();

    function selectRole(name) {
        setRole(name);
    }

    async function onSubmit(data) {
        try {
            const res = await axios.post("http://localhost:3000/api/users/signup", data);
            if (res.data.token) {
                localStorage.clear()
                localStorage.setItem("token", res.data.token);
            } else {
                console.log(res.data.message);
            }

            switch (res.data.role) {
                case "seller":
                    navigate("/seller/dashboard")
                    break
                case "buyer":
                    navigate("/buyer/dashboard");
                    break
                default:
                    navigate("/login");
                    break
            }
        } catch (err) {
            console.log(err.message)
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
                            <p class="text-sm text-slate-500 mt-1">Join the marketplace as a buyer or seller</p>
                        </div>

                        {/* <!-- Role selection --> */}
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <label onClick={() => selectRole("seller")}
                                class={`border-2 rounded-xl p-4 text-center cursor-pointer hover:border-slate-300 ${role === "seller" ? "border-emerald-600 bg-emerald-50" : "border-slate-200"}`}>
                                <input type="radio" name="role" class="sr-only" value="seller" {...register("role")} checked={role === "seller"} />
                                <svg
                                    class={`w-7 h-7 mx-auto mb-2 ${role === "seller" ? "text-emerald-600" : "text-slate-400"}`}
                                    fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p class="text-sm font-semibold text-slate-900">I'm a Seller</p>
                                <p class="text-xs text-slate-500 mt-1">List and sell waste materials</p>
                            </label>

                            <label onClick={() => selectRole("buyer")}
                                class={`border-2 rounded-xl p-4 text-center cursor-pointer hover:border-slate-300 ${role === "buyer" ? "border-emerald-600 bg-emerald-50" : "border-slate-200"}`}>
                                <input type="radio" name="role" class="sr-only" value="buyer" {...register("role")} />
                                <svg
                                    class={`w-7 h-7 mx-auto mb-2 ${role === "buyer" ? "text-emerald-600" : "text-slate-400"}`}
                                    fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                                </svg>
                                <p class="text-sm font-semibold text-slate-900">I'm a Buyer</p>
                                <p class="text-xs text-slate-500 mt-1">Source recycled materials</p>
                            </label>
                        </div>

                        <form class="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {role === "buyer" && <div className="flex flex-col justify-center items-start gap-3 w-full">
                                <label className="block text-sm font-medium text-slate-700">Interested Category</label>
                                <select {...register("interested_category")}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                    {wasteCategories.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>}

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                                <input type="text" placeholder="Your company name"
                                    class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("company_name")} />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                <input type="tel" placeholder="+1 (555) 000-0000"
                                    class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("phone_number")} />
                            </div>

                            {role === "buyer" &&
                                <>
                                    <div>
                                        <label class="block text-sm font-medium text-slate-700 mb-2">Min Quantity (tons)</label>
                                        <input type="number" placeholder="Enter Estimated Minimum Quantity You will Purchase" {...register("minqty", { valueAsNumber: true })}
                                            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-slate-700 mb-2">Max Quantity (tons)</label>
                                        <input type="number" placeholder="Enter Estimated Maximum Quantity You will Purchase" {...register("maxqty", { valueAsNumber: true })}
                                            class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                </>}

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
                                        class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                </div>
                            </div>

                            <hr />

                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium text-slate-700">Address,</label>
                                {/* <input type="text" placeholder="e.g. 1200 Industrial Way, Newark, NJ" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" /> */}
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">Street</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("address.street")} />
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">City</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("address.city")} />
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">State</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("address.state")} />
                                </div>
                                <div className="flex justify-start items-center gap-3 w-full">
                                    <label className="block min-w-19 text-sm font-medium text-slate-700">Postal
                                        Code</label>
                                    <input type="text"
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("address.postal_code")} />
                                </div>
                                <div className="flex justify-start items-center gap-3 w-full">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                                    <select
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" {...register("address.country")}>
                                        <option>Sri Lanka</option>
                                    </select>
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

export default GuestsSignup
