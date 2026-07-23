import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';

const BuyerSettings = () => {
    const [data, setData] = useState([]);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    const { register, handleSubmit, formState: { errors } } = useForm({
        values: {
            company_name: data.company_name,
            phone_number: data.phone_number,
            address: {
                street: data.address?.street,
                city: data.address?.city,
                state: data.address?.state,
                postal_code: data.address?.postal_code,
                country: data.address?.country,
            },
        }
    });

    useEffect(() => {
        async function loadbuyer() {
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_BUYER_DETAILS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }

        loadbuyer()
    }, []);

    async function onSubmit(data) {
        try {
            await axios.put(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_UPDATE_BUYER_DETAILS_URL,
                { data },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })
            toast.success('Profile updated successfully!')
        } catch (err) {
            toast.error('Something went wrong! Please try again later.')
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            return setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
        }

        if (passwordData.newPassword.length < 6) {
            return setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' });
        }

        console.log(passwordData)
        try {
            const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_CHANGE_PASSWORD_URL, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            setPasswordMessage({ type: 'success', text: res.data.message });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPasswordMessage({
                type: 'error',
                text: err.response?.data?.message || 'Failed to update password'
            });
        }
    };

    return (
        <>
            {/* <!-- PROFILE / ACCOUNT SETTINGS PAGE (BUYER) --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="mb-8">
                    <h1 class="text-2xl font-bold text-slate-900">Profile &amp; Account Settings</h1>
                    <p class="text-sm text-slate-500 mt-1">Manage your company profile and account preferences</p>
                </div>

                <div class="max-w-2xl space-y-6">
                    <form className="bg-white rounded-xl border border-slate-200 p-6 space-y-5"
                        onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Company Name</label>
                            <input type="text" placeholder="Your company name" {...register("company_name", { required: "Company Name is Required" })}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            {errors.company_name && <p className="text-red-600 font-medium">{errors.company_name?.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                            <input type="tel" placeholder="+1 (555) 000-0000" {...register("phone_number", { required: "Phone Number is Required" })}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                            {errors.phone_number && <p className="text-red-600 font-medium">{errors.phone_number?.message}</p>}
                        </div>

                        <hr />

                        <div className="flex flex-col gap-2">
                            <label className="block text-sm font-medium text-slate-700">Address,</label>
                            {/* <input type="text" placeholder="e.g. 1200 Industrial Way, Newark, NJ" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" /> */}
                            <div className="flex justify-start items-center gap-3">
                                <label className="block text-sm font-medium text-slate-700">Street</label>
                                <input type="text" {...register("address.street", { required: "Street is Required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.address?.street && <p className="text-red-600 font-medium">{errors.address?.street?.message}</p>}
                            </div>
                            <div className="flex justify-start items-center gap-3">
                                <label className="block text-sm font-medium text-slate-700">City</label>
                                <input type="text" {...register("address.city", { required: "City is Required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.address?.city && <p className="text-red-600 font-medium">{errors.address?.city?.message}</p>}
                            </div>
                            <div className="flex justify-start items-center gap-3">
                                <label className="block text-sm font-medium text-slate-700">State</label>
                                <input type="text" {...register("address.state", { required: "State is Required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.address?.state && <p className="text-red-600 font-medium">{errors.address?.state?.message}</p>}
                            </div>
                            <div className="flex justify-start items-center gap-3 w-full">
                                <label className="block min-w-19 text-sm font-medium text-slate-700">Postal
                                    Code</label>
                                <input type="text" {...register("address.postal_code", { required: "Postal Code is Required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                {errors.address?.postal_code && <p className="text-red-600 font-medium">{errors.address?.postal_code?.message}</p>}
                            </div>
                            <div className="flex justify-start items-center gap-3 w-full">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                                <select {...register("address.country", { required: "Country is Required" })}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500" >
                                    <option>Sri Lanka</option>
                                </select>
                                {errors.address?.country && <p className="text-red-600 font-medium">{errors.address?.country?.message}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button type="submit"
                                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Update
                                Details
                            </button>
                        </div>
                    </form>

                    <form class="bg-white rounded-xl border border-slate-200 p-6 space-y-5" onSubmit={handlePasswordSubmit}>
                        <h2 class="text-lg font-semibold text-slate-900">Change Password</h2>

                        {passwordMessage.text && (
                            <div className={`p-3 rounded-lg text-sm ${passwordMessage.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                                {passwordMessage.text}
                            </div>
                        )}

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                            <input type="password" placeholder="••••••••" required
                                value={passwordData.currentPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                            <input type="password" placeholder="••••••••" required
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                            <input type="password" placeholder="••••••••" required
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div class="flex justify-end pt-2">
                            <button type="submit"
                                class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Update
                                Password
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default BuyerSettings
