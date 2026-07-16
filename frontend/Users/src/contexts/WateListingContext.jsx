import {createContext, useContext, useState} from "react";

const WasteListingContext = createContext()

export function WasteListingProvider({children}) {
    const [waste_listing_id, setWaste_listing_id] = useState("")
    const [seller_id, setSeller_id] = useState("")

    const values = {waste_listing_id, setWaste_listing_id, seller_id, setSeller_id}
    return <WasteListingContext.Provider value={values}>{children}</WasteListingContext.Provider>
}

export function useWasteListingContext() {
    return useContext(WasteListingContext)
}