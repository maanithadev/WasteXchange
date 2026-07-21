import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SellerListingStatus = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(import.meta.env.VITE_GET_ALL_ACTIVE_WASTELISTINGS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setData(res.data)
        }

        fetchData()
    }, []);

    return (
        <>
            {/* <!-- MY LISTINGS PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen relative">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Listing Status / Matches</h1>
                        <p className="text-sm text-slate-500 mt-1">Only Active Listings are Displayed Here</p>
                    </div>
                    <Link to="/seller/upload-waste">
                        <button
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-4 py-2.5 rounded-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            New Listing
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* <!-- Cards --> */}
                    {data.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <img src={`http://localhost:3000/uploads/${item.image}`}
                                className="w-full h-40 object-cover"
                                alt={item.title} />
                            <div className="w-full p-4 flex flex-col">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                                    {/* <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">{item.status}</span> */}
                                </div>
                                <p className="text-xs text-slate-500 mb-4">{item.quantity} {item.unit} &middot; {item.category}</p>
                                <div className="w-full">
                                    <Link to={`/seller/listing-matches-details/${item._id}`}>
                                        <button className="w-full px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">View Buyers</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default SellerListingStatus
