import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BuyerTrackOrder = () => {
    // In a real application, you would use useParams to get the order ID
    // and fetch the order details from the backend.

    const data = {
        order: {
            quantity: 50,
            unit: "tons",
            total_price: 150000,
            currency: "LKR",
            status: "Confirmed",
            ordered_date: "2026-07-14"
        },
        payment: {
            order_id: "ORD-98234710",
            transaction_id: "TXN-88392011",
            payment_method: "Credit Card",
            payment_status: "Success"
        },
        product: {
            title: "Recycled Aluminum Scrap",
            category: "Metals",
            street: "45 Industrial Zone",
            city: "Kandy",
            state: "Central",
            postal_code: "20000"
        },
        seller: {
            company_name: "Green Metals Co."
        }
    }

    return (
        <>
            {/* <!-- TRACK ORDER PAGE (BUYER VIEW) --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Link to="/buyer/my-orders" className="text-sm font-medium text-blue-600 hover:text-blue-700">My Orders</Link>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        <span className="text-sm text-slate-500 font-medium">Order {data.payment.order_id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Track Order</h1>
                            <p className="text-sm text-slate-500 mt-1">View the complete details of your transaction</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-full border border-emerald-200">
                                Status: {data.order.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Progress Tracker */}
                <div className="mb-8 bg-white rounded-xl border border-slate-200 p-8 pt-10 shadow-sm overflow-hidden">
                    <div className="relative flex justify-between items-center w-full max-w-4xl mx-auto">

                        {/* Background Line */}
                        <div className="absolute left-[12%] right-[12%] top-6 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>

                        {/* Active Line (mocking 'Confirmed' status) */}
                        <div className="absolute left-[12%] top-6 -translate-y-1/2 h-1 bg-emerald-500 z-0 transition-all duration-500" style={{ width: '25%' }}></div>

                        {/* Step 1: Pending (Completed) */}
                        <div className="relative z-10 flex flex-col items-center w-1/4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md ring-[6px] ring-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <span className="text-sm font-bold text-emerald-600 mt-4 capitalize tracking-wide">Pending</span>
                        </div>

                        {/* Step 2: Confirmed (Current) */}
                        <div className="relative z-10 flex flex-col items-center w-1/4">
                            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-md ring-[6px] ring-white">
                                <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                            <span className="text-sm font-bold text-emerald-600 mt-4 capitalize tracking-wide">Confirmed</span>
                        </div>

                        {/* Step 3: Shipped (Upcoming) */}
                        <div className="relative z-10 flex flex-col items-center w-1/4">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center ring-[6px] ring-white border-2 border-slate-200">
                                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-400 mt-4 capitalize tracking-wide">Shipped</span>
                        </div>

                        {/* Step 4: Collected (Upcoming) */}
                        <div className="relative z-10 flex flex-col items-center w-1/4">
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center ring-[6px] ring-white border-2 border-slate-200">
                                <div className="w-3 h-3 bg-slate-200 rounded-full"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-400 mt-4 capitalize tracking-wide">Collected</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Order Specific Details */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <span className="text-sm text-slate-500">Ordered Date</span>
                                <span className="text-sm font-medium text-slate-900">{data.order.ordered_date}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <span className="text-sm text-slate-500">Quantity</span>
                                <span className="text-sm font-medium text-slate-900">{data.order.quantity} {data.order.unit}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-sm font-medium text-slate-700">Total Price</span>
                                <span className="text-xl font-bold text-blue-600">{data.order.currency} {data.order.total_price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Specific Details */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Payment Details</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <span className="text-sm text-slate-500">Order ID</span>
                                <span className="text-sm font-medium text-slate-900">{data.payment.order_id}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <span className="text-sm text-slate-500">Transaction ID</span>
                                <span className="text-sm font-medium text-slate-900">{data.payment.transaction_id}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <span className="text-sm text-slate-500">Payment Method</span>
                                <span className="text-sm font-medium text-slate-900">{data.payment.payment_method}</span>
                            </div>
                            <div className="flex justify-between pt-2">
                                <span className="text-sm text-slate-500 mt-1">Payment Status</span>
                                <span className="text-sm px-3 py-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">{data.payment.payment_status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Waste Product Details */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Product Info</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <span className="text-sm text-slate-500">Product</span>
                                <span className="text-sm font-medium text-slate-900 text-right">{data.product.title}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-100 pb-3">
                                <span className="text-sm text-slate-500">Category</span>
                                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold">{data.product.category}</span>
                            </div>
                            <div className="pt-2 flex justify-between">
                                <span className="text-sm text-slate-500 block mb-1">Pickup Location</span>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-900">
                                        {data.product.street}, {data.product.city}
                                    </p>
                                    <p className="text-sm text-slate-600 mt-0.5">
                                        {data.product.state}, {data.product.postal_code}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Seller Details */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">Seller Info</h2>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex items-center gap-5 bg-slate-50 border border-slate-100 rounded-xl p-5 mt-2">
                                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold uppercase shrink-0">
                                    {data.seller.company_name.substring(0, 2)}
                                </div>
                                <div>
                                    <h3 className="text-md font-bold text-slate-900">{data.seller.company_name}</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <p className="text-xs text-slate-500 font-medium">Verified Seller</p>
                                    </div>
                                    <button className="mt-3 text-sm text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                        Message Seller
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}

export default BuyerTrackOrder
