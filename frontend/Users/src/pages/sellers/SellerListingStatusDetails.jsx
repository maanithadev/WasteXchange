import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { useConversationsContext } from "../../contexts/ConversationsContext";
import Loading from "../../components/Loading"

const SellerListingStatusDetails = () => {

    const { id } = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const { setConversationId } = useConversationsContext()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_SELLER_WASTE_MATCHES_URL + id, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            setData(res.data)
            setLoading(false)
        }
        fetchData()
    }, [])

    async function startMessaging(buyer_id, seller_id) {
        const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_START_CHAT_URL, {
            buyer_id,
            seller_id
        })
        setConversationId(res.data.conversation_id)
        navigate("/seller/messages")
    }

    return loading
        ? <Loading />
        : (
            <>
                {/* <!-- LISTING STATUS / MATCH VIEW PAGE --> */}
                <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                    <div className="mb-8">
                        <p className="text-xs font-medium text-emerald-600 mb-1">My Listings / Match View</p>
                        <h1 className="text-2xl font-bold text-slate-900">{data[0].wasteListings_id?.title}</h1>
                        <p className="text-sm text-slate-500 mt-1">{data[0].wasteListings_id?.quantity} {data[0].wasteListings_id?.unit} &middot; {data[0].wasteListings_id?.category}</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between pb-6 border-b-2 border-yellow-500">
                            <h2 className="text-lg font-semibold text-slate-900">Matched Buyers</h2>
                            <span className="text-sm font-medium text-slate-400">{data.length} matches found</span>
                        </div>

                        <ul className="divide-y divide-slate-100">
                            {data.map((item, index) => (
                                <li key={index} className="py-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                                    {/* <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover" alt="EcoPlast Industries" /> */}
                                    <p className="text-sm font-semibold text-slate-900">{item.buyerDetails?.company_name}</p>

                                    {/* <p className="text-xs text-slate-500">Recycled Plastics Manufacturer &middot; 12 mi away</p> */}
                                    <div className="w-full sm:w-[40%] flex flex-col md:flex-row md:items-center justify-center md:gap-4">
                                        <div className="w-full bg-slate-100 rounded-full h-2 mt-2 max-w-xs">
                                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${item.matchScore}%` }}></div>
                                        </div>
                                        <p className="text-xs font-semibold text-emerald-700 mt-1">{item.matchScore}% Match</p>
                                    </div>

                                    <button onClick={() => startMessaging(item.buyerDetails?.user_id, item.wasteListings_id?.seller_id)}
                                        className="text-xs font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 shrink-0">Message Buyer</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </main>
            </>
        )
}

export default SellerListingStatusDetails
