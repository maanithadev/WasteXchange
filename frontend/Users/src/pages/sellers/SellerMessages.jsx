import { useConversationsContext } from "../../contexts/ConversationsContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { useVerifyUser } from "../../hooks/useVerifyUser"

const SellerMessages = () => {
    const { user } = useVerifyUser()
    const { conversationId = null, setConversationId } = useConversationsContext()
    const [conversations, setConversations] = useState([])
    const [messages, setMessages] = useState([])
    const [typedMessage, setTypedMessage] = useState("")

    useEffect(() => {
        async function getConversations() {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_GET_ALL_SELLER_CONVERSATIONS_URL, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setConversations(res.data)
        }

        async function findMessages() {
            const res = await axios.get(import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_GET_MESSAGES_URL + conversationId, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
            setMessages(res.data);
        }

        getConversations()
        if (conversationId !== "") findMessages()
    }, [conversationId])

    async function sendMessage() {
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + import.meta.env.VITE_SEND_MESSAGE_URL + conversationId,
            { message: typedMessage },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            })
        setMessages((prev) => [...prev, res.data])
        setTypedMessage("")
    }

    return (
        <>
            {/* <!-- MESSAGES / CHAT PAGE (SELLER VIEW) --> */}
            <main className="flex-1 bg-slate-50 h-[calc(100vh-4rem)] flex overflow-hidden">
                {/* <!-- Conversation list --> */}
                <div className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0">
                    <div class="p-4 border-b border-slate-200">
                        <h2 class="text-lg font-bold text-slate-900">Messages</h2>
                        <input type="text" placeholder="Search conversations..." class="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                    <ul class="flex-1 overflow-y-auto divide-y divide-slate-100">
                        {conversations.map((item, index) => (
                            <li key={index} class={`flex items-center gap-3 px-4 py-3 bg-blue-50 border-l-4 ${conversationId === item._id ? "border-blue-600" : "border-transparent"} cursor-pointer`} onClick={() => setConversationId(item._id)}>
                                <img src="https://placehold.co/40x40" class="w-10 h-10 rounded-full object-cover" alt="Green Metals Co." />
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-semibold text-slate-900 truncate">{item.buyer_id?.company_name}</p>
                                    <p class="text-xs text-slate-500 truncate">{item.last_message}</p>
                                </div>
                                <span class="text-xs text-slate-400 shrink-0">2m</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* <!-- Chat window --> */}
                {conversationId !== "" && (
                    <>
                        <div class="flex-1 flex flex-col">
                            {/* <!-- Chat header --> */}
                            <div class="h-16 flex items-center gap-3 px-6 border-b border-slate-200 bg-white">
                                <img src="https://placehold.co/36x36" class="w-9 h-9 rounded-full object-cover" alt="EcoPlast Industries" />
                                <div>
                                    <p class="text-sm font-semibold text-slate-900">EcoPlast Industries</p>
                                    <p class="text-xs text-emerald-600">Online</p>
                                </div>
                            </div>

                            {/* <!-- Messages --> */}
                            <div class="flex-1 overflow-y-auto p-6 space-y-4">
                                {messages.map((item, index) => (
                                    <div key={index} className={`flex ${user.user_id === item.sender_id ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs px-4 py-2.5 rounded-2xl ${user.user_id === item.sender_id ? 'bg-blue-600 rounded-br-sm' : 'bg-white border border-slate-200 rounded-bl-sm'}`}>
                                            <p class={`text-sm ${user.user_id === item.sender_id ? 'text-white' : 'text-slate-800'}`}>{item.message}</p>
                                            <p class={`text-[10px] mt-1 ${user.user_id === item.sender_id ? 'text-blue-100' : 'text-slate-400'}`}>{item.create_at}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <!-- Message input bar --> */}
                            <div class="border-t border-slate-200 bg-white p-4 flex items-center gap-3">
                                <button class="text-slate-400 hover:text-slate-600">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                </button>
                                <input type="text" placeholder="Type a message..." value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} class="flex-1 rounded-full border border-slate-300 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                                <button onClick={sendMessage} class="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </>
    )
}

export default SellerMessages
