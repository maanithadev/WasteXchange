import {useEffect, useState} from "react";
import axios from "axios";

const SellerMyListings = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("http://localhost:3000/api/sellers/get-all-waste-listings")
            setData(res.data)
        }

        fetchData()
    }, []);

    return (
        <>
            {/* <!-- MY LISTINGS PAGE --> */}
            <main class="flex-1 p-8 bg-slate-50 min-h-screen">
                <div class="flex items-center justify-between mb-8">
                    <div>
                        <h1 class="text-2xl font-bold text-slate-900">My Listings</h1>
                        <p class="text-sm text-slate-500 mt-1">Manage the waste materials you've posted</p>
                    </div>
                    <button
                        class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        New Listing
                    </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* <!-- Card 1 --> */}
                    {data.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <img src={`http://localhost:3000/uploads/${item.waste_image}`} className="w-full h-40 object-cover"
                                 alt={item.waste_title}/>
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-slate-900 text-sm">{item.waste_title}</h3>
                                    <span
                                        className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{item.status}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-4">{item.quantity} {item.unit} &middot; {item.waste_category}</p>
                                <div className="flex gap-2">
                                    <button
                                        className="flex-1 text-xs font-medium border border-slate-300 text-slate-700 rounded-lg py-2 hover:bg-slate-50">Edit
                                    </button>
                                    <button
                                        className="flex-1 text-xs font-medium border border-red-200 text-red-600 rounded-lg py-2 hover:bg-red-50">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default SellerMyListings
