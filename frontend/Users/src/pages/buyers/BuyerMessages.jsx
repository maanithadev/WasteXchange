import { useConversationsContext } from "../../contexts/ConversationsContext"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { useVerifyUser } from "../../hooks/useVerifyUser"
import { io } from "socket.io-client"
import toast from "react-hot-toast";

const BuyerMessages = () => {
    const { user } = useVerifyUser()
    const { conversationId = null, setConversationId } = useConversationsContext()
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [typedMessage, setTypedMessage] = useState("")
    const [isOnline, setIsOnline] = useState(false)

    const activeConversation = conversations.find(c => c._id === conversationId);

    useEffect(() => {
        async function getConversations() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_ALL_BUYER_CONVERSATIONS_URL, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                setConversations(res.data)
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }

        async function findMessages() {
            try {
                const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_GET_MESSAGES_URL + conversationId, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                setMessages(res.data);
            } catch (err) {
                if (err.message === "Request failed with status code 429") {
                    toast.error("Too many requests, please try again later.")
                } else {
                    toast.error('Something went wrong! Please try again later.')
                }
            }
        }

        getConversations()
        if (conversationId !== "") findMessages()
    }, [conversationId])

    useEffect(() => {
        async function checkOnlineStatus() {
            if (activeConversation && activeConversation.seller_id) {
                try {
                    const res = await axios.get(import.meta.env.VITE_USERS_BACKEND_URL + "/api/messages/check-online-status/" + activeConversation.seller_id);
                    setIsOnline(res.data.isOnline);
                } catch (err) {
                    if (err.message === "Request failed with status code 429") {
                        toast.error("Too many requests, please try again later.")
                    } else {
                        toast.error('Something went wrong! Please try again later.')
                    }
                }
            }
        }
        checkOnlineStatus();

        // Mark as read when opened
        if (conversationId) {
            setConversations(prev => prev.map(c =>
                c._id === conversationId ? { ...c, hasUnread: false } : c
            ));
        }
    }, [conversationId, activeConversation?.seller_id]);

    useEffect(() => {
        if (!user || !user.user_id) return;

        const socket = io(import.meta.env.VITE_USERS_BACKEND_URL);

        socket.on("connect", () => {
            socket.emit("register", user.user_id);
        });

        socket.on("receive_message", (newMessage) => {
            // Append message if it belongs to the active conversation
            setMessages((prev) => {
                if (newMessage.conversation_id === conversationId) {
                    return [...prev, newMessage];
                }
                return prev;
            });
            // Update conversations list latest message / unread count
            setConversations(prev => prev.map(c => {
                if (c._id === newMessage.conversation_id) {
                    return {
                        ...c,
                        last_message: newMessage.message,
                        hasUnread: conversationId !== newMessage.conversation_id
                    };
                }
                return c;
            }));
        });

        return () => {
            socket.disconnect();
        };
    }, [user, conversationId]);

    async function sendMessage() {
        try {
            const res = await axios.post(import.meta.env.VITE_USERS_BACKEND_URL + import.meta.env.VITE_SEND_MESSAGE_URL + conversationId,
                { message: typedMessage },
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    }
                })
            setMessages((prev) => [...prev, res.data])
            setConversations(prev => prev.map(c =>
                c._id === conversationId ? { ...c, last_message: typedMessage } : c
            ));
            setTypedMessage("")
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
            {/* <!-- MESSAGES / CHAT PAGE (BUYER VIEW) --> */}
            <main className="flex-1 bg-slate-50 h-[calc(100vh-4rem)] flex overflow-hidden">
                {/* <!-- Conversation list --> */}
                <div className={`${conversationId !== "" ? "hidden md:flex" : "flex"} w-full md:w-80 bg-white border-r border-slate-200 flex-col shrink-0`}>
                    <div className="p-4 border-b border-slate-200">
                        <h2 className="text-lg font-bold text-slate-900">Messages</h2>
                        {/* <input type="text" placeholder="Search conversations..." className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" /> */}
                    </div>
                    <ul className="flex-1 overflow-y-auto divide-y divide-slate-100">
                        {conversations.map((item, index) => (
                            <li key={index} className={`flex items-center gap-3 px-4 py-3 bg-blue-50 border-l-4 ${conversationId === item._id ? "border-blue-600" : "border-transparent"} cursor-pointer`} onClick={() => setConversationId(item._id)}>
                                <img src="https://placehold.co/40x40" className="w-10 h-10 rounded-full object-cover" alt="Green Metals Co." />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 truncate">{item.sellerDetails?.company_name}</p>
                                    {/* last message */}
                                    <p className={`text-xs truncate ${item.hasUnread ? "font-bold text-slate-900" : "text-slate-500"}`}>{item.last_message}</p>
                                </div>
                                <span className="text-xs text-slate-400 shrink-0">2m</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* <!-- Chat window --> */}
                {conversationId !== "" && (
                    <>
                        <div className={`flex-1 flex-col ${conversationId !== "" ? "flex" : "hidden md:flex"}`}>
                            {/* <!-- Chat header --> */}
                            <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200 bg-white shrink-0">
                                <button onClick={() => setConversationId("")} className="md:hidden text-slate-500 hover:text-slate-700 mr-1">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <img src="https://placehold.co/36x36" className="w-9 h-9 rounded-full object-cover"
                                    alt="Green Metals Co." />
                                <div>
                                    {/* company name */}
                                    <p className="text-sm font-semibold text-slate-900">{activeConversation?.sellerDetails?.company_name}</p>
                                    <p className={`text-xs ${isOnline ? "text-emerald-600" : "text-slate-400"}`}>{isOnline ? "Online" : "Offline"}</p>
                                </div>
                            </div>

                            {/* <!-- Messages --> */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4 overflow-y-auto">
                                {messages.map((item, index) => (
                                    <div key={index} className={`flex ${user?.user_id === item.sender_id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs px-4 py-2.5 rounded-2xl ${user?.user_id === item.sender_id ? 'bg-blue-600 rounded-br-sm' : 'bg-white border border-slate-200 rounded-bl-sm'}`}>
                                            <p className={`text-sm ${user?.user_id === item.sender_id ? 'text-white' : 'text-slate-800'}`}>{item.message}</p>
                                            <p className={`text-[10px] mt-1 ${user?.user_id === item.sender_id ? 'text-blue-100' : 'text-slate-400'}`}>{new Date(item.create_at).toLocaleString().toString().slice(0, -3)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <!-- Message input bar --> */}
                            <div className="border-t border-slate-200 bg-white p-4 flex items-center gap-3">
                                {/* <button className="text-slate-400 hover:text-slate-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button> */}
                                <input type="text" placeholder="Type a message..." value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)}
                                    className="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button onClick={sendMessage}
                                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </>
    )
}

export default BuyerMessages
