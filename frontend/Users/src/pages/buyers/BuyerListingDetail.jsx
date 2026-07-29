import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCheckoutContext } from "../../contexts/CheckoutContext.jsx";
import { useVerifyUser } from "../../hooks/useVerifyUser";
import { useConversationsContext } from "../../contexts/ConversationsContext.jsx";
import toast from "react-hot-toast";

const BuyerListingDetail = () => {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [matchScore, setMatchScore] = useState(null)

    const { setCheckoutParams } = useCheckoutContext()
    const { user } = useVerifyUser();
    const { setConversationId } = useConversationsContext()
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchWasteListingData() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_SINGLE_WASTE_LISTING_URL + id)
                setData(res.data)
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }

        async function fetchMatchScore() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_WASTE_MATCH_SCORE_URL + id, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setMatchScore(res.data.matchScore)
            } catch (err) {
                console.log(err)
            }
        }

        fetchWasteListingData()
        fetchMatchScore()
    }, []);

    async function handlePlaceOrder() {
        try {
            const completeDataToSend = { ...data, buyer_id: user.user_id }
            const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_CHECKOUT_URL, {
                data: completeDataToSend,
            })
            setCheckoutParams(res.data)
            navigate("/initiate-checkout")
        } catch (err) {
            if (err.message === "Request failed with status code 429") {
                toast.error("Too many requests, please try again later.")
            } else {
                toast.error('Something went wrong! Please try again later.')
            }
        }
    }

    async function startMessaging() {
        try {
            const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_START_CHAT_URL, {
                buyer_id: user.user_id,
                seller_id: data.seller_id
            })
            setConversationId(res.data.conversation_id)
            navigate("/buyer/messages")
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
            {/* <!-- LISTING DETAIL PAGE --> */}
            <main className="flex-1 p-8 bg-slate-50 min-h-screen">
                <p className="text-xs font-medium text-blue-600 mb-4">Browse Marketplace / Listing Detail</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* <!-- Left: image + description --> */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <img src={import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_WASTELISTING_IMAGES_ACCESSING_URL + data.image}
                                className="w-full object-cover" alt="Shredded HDPE Pellets" />
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <span
                                    className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{data.category}</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">{data.title}</h1>
                            <p className="text-sm text-slate-500 mb-4">{data.quantity} {data.unit} available &middot; {data.location?.street}, {data.location?.city}, {data.location?.state}, {data.location?.postal_code}</p>
                            {/* <h2 className="text-sm font-semibold text-slate-900 mb-2">Description</h2> */}
                            <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 mt-3">
                                {data.description ? (
                                    <ul className="space-y-4">
                                        {data.description.split('\n').map(item => item.trim()).filter(item => item.length > 0).map((bullet, index) => (
                                            <li key={index}
                                                className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                                                <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">No description provided.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* <!-- Right: seller info, match score, actions --> */}
                    <div className="w-full h-fit space-y-6 lg:sticky lg:top-10">
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <p className="text-sm font-medium text-slate-500 mb-1">Price</p>
                            <p className="text-3xl font-bold text-slate-900 mb-4">{data.currency} {data.price}</p>

                            {/* Match Score */}
                            {matchScore !== null && (
                                <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 mb-5">
                                    <p className="text-xs text-slate-500 mb-1">Match Score</p>
                                    <div className="w-full bg-white rounded-full h-2 mb-1 border border-blue-100">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${matchScore}%` }}></div>
                                    </div>
                                    <p className="text-xs font-semibold text-blue-700">{matchScore}% match for your profile</p>
                                </div>
                            )}

                            <button onClick={handlePlaceOrder}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg mb-2 cursor-pointer">Place
                                Order
                            </button>
                            <button onClick={startMessaging}
                                className="w-full border border-slate-300 text-slate-700 text-sm font-medium py-2.5 rounded-lg hover:bg-slate-50">Message
                                Seller
                            </button>
                        </div>

                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h2 className="text-sm font-semibold text-slate-900 mb-4">Seller Information</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <img src="https://placehold.co/48x48" className="w-12 h-12 rounded-full object-cover"
                                    alt="Green Metals Co." />
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">{data.sellerDetails?.company_name}</p>
                                    <p className="text-xs text-slate-500">Verified Seller</p>
                                </div>
                            </div>
                            {/* <ul className="text-sm text-slate-600 space-y-2">
                                <li className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                    98% on-time delivery rate
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BuyerListingDetail
