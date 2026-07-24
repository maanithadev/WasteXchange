import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const GuestsBrowseMarketplace = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_BUYERS_GET_ALL_WASTE_LISTINGS_URL)
                setData(res.data)
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }

        fetchData()
    }, [])

    return (
        <>
            {/* <!-- BROWSE MARKETPLACE PAGE (GUEST, READ-ONLY VIEW) --> */}
            <main className="bg-slate-50 min-h-screen">
                {/* <!-- Sign-up banner --> */}
                <div className="bg-emerald-600 px-6 py-3 flex items-center justify-center gap-3 text-center">
                    <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg >
                    <p className="text-sm text-white font-medium" > Sign up as Buyer to view full details and contact sellers.</p >
                    <Link to="/signup" className="text-xs font-semibold bg-white text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-50" > Sign Up Free</Link >
                </div >

                <div className="px-6 lg:px-10 py-10 max-w-6xl mx-auto" >
                    <div className="mb-8" >
                        <h1 className="text-2xl font-bold text-slate-900" > Browse Marketplace</h1 >
                        <p className="text-sm text-slate-500 mt-1" > {data.length} active listings across the platform</p >
                    </div >

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" >
                        {
                            data.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden relative">
                                    <img src={`http://localhost:3000/uploads/${item.image}`}
                                        className="w-full h-40 object-cover"
                                        alt="Shredded HDPE Pellets" />
                                    <div className="p-4">
                                        <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.title}</h3>
                                        <p className="text-xs text-slate-500 mb-1">{item.quantity} {item.unit} &middot; {item.category}</p>
                                        <div className="h-3 w-24 bg-slate-200 rounded blur-[2px] mb-3"></div>
                                        <Link to="/signup" className="block w-full text-center text-xs font-medium bg-emerald-600 text-white rounded-lg py-2 cursor-pointer">Sign Up to View</Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div >
                </div >
            </main >
        </>
    )
}

export default GuestsBrowseMarketplace
