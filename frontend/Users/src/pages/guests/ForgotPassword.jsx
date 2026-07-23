import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [passwordData, setPasswordData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        if (passwordData.newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
            return;
        }

        try {
            const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_FORGOT_PASSWORD_URL, {
                email: passwordData.email,
                newPassword: passwordData.newPassword
            });
            
            toast.success(res.data.message || 'Password reset successful!');
            navigate("/login");
        } catch (err) {
            setMessage({ 
                type: 'error', 
                text: err.response?.data?.message || 'Something went wrong! Please try again later.' 
            });
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl border border-slate-200 p-8">
                    <div className="text-center mb-8">
                        <span className="text-xl font-bold text-emerald-700">WasteXchange</span>
                        <h1 className="text-xl font-bold text-slate-900 mt-4">Reset Password</h1>
                        <p className="text-sm text-slate-500 mt-1">Enter your email and a new password</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {message.text && (
                            <div className={`p-3 rounded-lg text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'}`}>
                                {message.text}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <input type="email" placeholder="you@company.com" required
                                value={passwordData.email}
                                onChange={(e) => setPasswordData({ ...passwordData, email: e.target.value })}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                            <input type="password" placeholder="••••••••" required
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                            <input type="password" placeholder="••••••••" required
                                value={passwordData.confirmPassword}
                                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                        </div>

                        <button type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg">
                            Reset Password
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">Remember your password?
                        <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-700 ml-1">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;
