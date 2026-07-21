import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const BuyerMatchedRecommendations = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_GET_BUYER_WASTE_MATCHES_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(res.data)
        }
        fetchData()
    }, [])

    return (
        <>
            {/* <!-- MATCHED RECOMMENDATIONS PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Matched Recommendations</h1>
                    <p className="text-sm text-slate-500 mt-1">Suggested listings tailored to your buying profile</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <img src={`http://localhost:3000/uploads/${item.wasteListings_id.image}`} className="w-full h-40 object-cover" alt="Shredded HDPE Pellets" />
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-900 text-sm mb-1">{item.wasteListings_id.title}</h3>
                                {/* <p className="text-xs text-slate-400 mb-3">Sold by {item.wasteListings_id.company_name}</p> */}
                                <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.matchScore}%` }}></div>
                                </div>
                                <p className="text-xs font-semibold text-blue-700 mb-3">{item.matchScore}% match</p>
                                <Link to={`/buyer/listing-detail/${item.wasteListings_id._id}`}><button className="w-full text-xs font-medium bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">View Details</button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default BuyerMatchedRecommendations
