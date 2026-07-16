import { createContext, useContext, useState } from "react";

const ConversationsContext = createContext()

export function ConversationsContextProvider({ children }) {
    const [conversationId, setConversationId] = useState("")

    const values = { conversationId, setConversationId }
    return <ConversationsContext.Provider value={values}>{children}</ConversationsContext.Provider>
}

export function useConversationsContext() {
    return useContext(ConversationsContext)
}
