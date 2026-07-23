import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const GuestsSignup = () => {
    const wasteCategories = ["Construction", "Metals", "Wood"]
    const { register, handleSubmit, formState } = useForm()
    const { errors } = formState

    const [role, setRole] = useState("seller")
    const navigate = useNavigate();

    function selectRole(name) {
        setRole(name);
    }

    async function onSubmit(data) {
        try {
            const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_USER_SIGNUP, data);
            if (res.data.token) {
                localStorage.clear()
                localStorage.setItem("token", res.data.token);
            } else {
                toast.error(res.data.message)
            }

            switch (res.data.role) {
                case "seller":
                    navigate("/seller/dashboard")
                    toast.success('Registration successful as Seller!')
                    break
                case "buyer":
                    navigate("/buyer/dashboard");
                    toast.success('Registration successful as Buyer!')
                    break
                default:
                    navigate("/login");
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
                            <p className="text-sm text-slate-500 mt-1">Join the marketplace as a buyer or seller</p>
                        </div>

                        {/* <!-- Role selection --> */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <label onClick={() => selectRole("seller")}
                                className={`border-2 rounded-xl p-4 text-center cursor-pointer hover:border-slate-300 ${role === "seller" ? "border-emerald-600 bg-emerald-50" : "border-slate-200"}`}>
                                <input type="radio" name="role" className="sr-only"
                                    value="seller" {...register("role", { required: "Role is Required" })}
                                    checked={role === "seller"} />
                                <svg
                                    className={`w-7 h-7 mx-auto mb-2 ${role === "seller" ? "text-emerald-600" : "text-slate-400"}`}
                                    fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <p className="text-sm font-semibold text-slate-900">I'm a Seller</p>
                                <p className="text-xs text-slate-500 mt-1">List and sell waste materials</p>
                            </label>

                            <label onClick={() => selectRole("buyer")}
                                className={`border-2 rounded-xl p-4 text-center cursor-pointer hover:border-slate-300 ${role === "buyer" ? "border-emerald-600 bg-emerald-50" : "border-slate-200"}`}>
                                <input type="radio" name="role" className="sr-only"
                                    value="buyer" {...register("role", { required: "Role is Required" })} />
                                <svg
                                    className={`w-7 h-7 mx-auto mb-2 ${role === "buyer" ? "text-emerald-600" : "text-slate-400"}`}
                                    fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                                </svg>
                                <p className="text-sm font-semibold text-slate-900">I'm a Buyer</p>
                                <p className="text-xs text-slate-500 mt-1">Source recycled materials</p>
                            </label>
                        </div>
                        {errors.role && <p>{errors.role?.message}</p>}

                        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            {role === "buyer" && <div className="flex flex-col justify-center items-start gap-3 w-full">
                                <label className="block text-sm font-medium text-slate-700">Interested Category</label>
                                <select {...register("interested_category", { required: "Interested Category is required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                    {wasteCategories.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                {errors.interested_category && <p>{errors.interested_category?.message}</p>}
                            </div>}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                                <input type="text" placeholder="Your company name" {...register("company_name", {
                                    required: "Company Name is required",
                                    minLength: { value: 3, message: "Minimum Characters Count is 3" }
                                })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.company_name &&
                                    <p className="text-red-600 font-medium">{errors.company_name?.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                <input type="tel" placeholder="07********" {...register("phone_number", {
                                    required: "Phone Number is required",
                                    minLength: { value: 10, message: "Minimum Numbers Count is 10" },
                                    maxLength: { value: 10, message: "Maximum Numbers Count is 10" }
                                })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.phone_number &&
                                    <p className="text-red-600 font-medium">{errors.phone_number?.message}</p>}
                            </div>

                            {role === "buyer" &&
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Min Quantity
                                            (tons)</label>
                                        <input type="number"
                                            placeholder="Enter Estimated Minimum Quantity You will Purchase" {...register("minqty", {
                                                valueAsNumber: true,
                                                required: "Minimum Quantity is Required",
                                                min: { value: 1, message: "Enter the Number as 1" },
                                                max: { value: 1, message: "Enter the Number as 1" }
                                            })}
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        {errors.minqty &&
                                            <p className="text-red-600 font-medium">{errors.minqty?.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Max Quantity
                                            (tons)</label>
                                        <input type="number"
                                            placeholder="Enter Estimated Maximum Quantity You will Purchase" {...register("maxqty", {
                                                valueAsNumber: true,
                                                required: "Maximum Quantity is Required",
                                                min: { value: 2, message: "Enter a Number as 2 or Higher" }
                                            })}
                                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                        {errors.maxqty &&
                                            <p className="text-red-600 font-medium">{errors.maxqty?.message}</p>}
                                    </div>
                                </>}

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                <input type="email"
                                    placeholder="you@company.com" {...register("email", { required: "Email is required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required />
                                {errors.email && <p className="text-red-600 font-medium">{errors.email?.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
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

                            <hr />

                            <div className="flex flex-col gap-2">
                                <label className="block text-sm font-medium text-slate-700">Address,</label>
                                {/* <input type="text" placeholder="e.g. 1200 Industrial Way, Newark, NJ" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" /> */}
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">Street</label>
                                    <input type="text" {...register("address.street", { required: "Street is required" })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    {errors.address?.street &&
                                        <p className="text-red-600 font-medium">{errors.address?.street?.message}</p>}
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">City</label>
                                    <input type="text" {...register("address.city", { required: "City is required" })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    {errors.address?.city &&
                                        <p className="text-red-600 font-medium">{errors.address?.city?.message}</p>}
                                </div>
                                <div className="flex justify-start items-center gap-3">
                                    <label className="block text-sm font-medium text-slate-700">State</label>
                                    <input type="text" {...register("address.state", { required: "State is required" })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    {errors.address?.state &&
                                        <p className="text-red-600 font-medium">{errors.address?.state?.message}</p>}
                                </div>
                                <div className="flex justify-start items-center gap-3 w-full">
                                    <label className="block min-w-19 text-sm font-medium text-slate-700">Postal
                                        Code</label>
                                    <input
                                        type="text" {...register("address.postal_code", { required: "Postal Code is required" })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                    {errors.address?.postal_code &&
                                        <p className="text-red-600 font-medium">{errors.address?.postal_code?.message}</p>}
                                </div>
                                <div className="flex justify-start items-center gap-3 w-full">
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                                    <select {...register("address.country", { required: "Country is required" })}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                                        <option>Sri Lanka</option>
                                    </select>
                                    {errors.address?.country &&
                                        <p className="text-red-600 font-medium">{errors.address?.country?.message}</p>}
                                </div>
                            </div>

                            <button type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg mt-2">Create
                                Account
                            </button>
                        </form>

                        <p className="text-center text-sm text-slate-500 mt-6">Already have an account?
                            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700"> Log in</Link>
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}

export default GuestsSignup
