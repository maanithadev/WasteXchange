import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Dot } from 'lucide-react';

const BuyerDashboard = () => {
    const [data, setData] = useState([]);
    const [card, setCard] = useState({});

    useEffect(() => {
        async function loadNotifications() {
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_SPECIFIC_USER_NOTIFICATIONS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setData(res.data);
        }

        async function loadCard() {
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_BUYER_DASHBOARD_CARDS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            setCard(res.data);
        }

        loadNotifications();
        loadCard();
    }, []);

    return (
        <>
            {/* <!-- BUYER DASHBOARD PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h1 class="text-2xl font-bold text-slate-900">Dashboard</h1>
                        <p class="text-sm text-slate-500 mt-1">Welcome back, EcoPlast Industries</p>
                    </div>
                    <Link to="/buyer/browse-marketplace">
                        <button
                            class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
                            </svg>
                            Browse Marketplace
                        </button>
                    </Link>
                </div>

                {/* <!-- Summary cards --> */}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Matched Listings</span>
                            <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">{card.matchedListings || 0}</p>
                        {/* <p class="text-xs text-slate-400 mt-1">+3 this week</p> */}
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Active Orders</span>
                            <div class="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">{card.activeOrders || 0}</p>
                        <p class="text-xs text-slate-400 mt-1">In progress</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Unread Notifications</span>
                            <div class="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">{card.unreadNotifications || 0}</p>
                        <p class="text-xs text-slate-400 mt-1">New updates</p>
                    </div>

                    <div class="bg-white rounded-xl border border-slate-200 p-5">
                        <div class="flex items-center justify-between mb-3">
                            <span class="text-sm font-medium text-slate-500">Total Carbon Saved</span>
                            <div class="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center">
                                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h6l2 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6l2 2z" />
                                </svg>
                            </div>
                        </div>
                        <p class="text-3xl font-bold text-slate-900">{card.currentMonthCarbonSaved || 0}t</p>
                        <p class="text-xs text-slate-400 mt-1">Carbon Saved from purchases</p>
                    </div>
                </div>

                {/* <!-- Recent activity feed --> */}
                <div class="bg-white rounded-xl border border-slate-200 p-6">
                    <h2 class="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
                    <ul class="divide-y divide-slate-100">
                        {data.map((item, index) => (
                            <li key={index} className="flex items-start gap-4 py-4">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                                    <Dot size={50} color="#009966"/>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-slate-800">{item.message}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{item.created_at}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </>
    )
}

export default BuyerDashboard
