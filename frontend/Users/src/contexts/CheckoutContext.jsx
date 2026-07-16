import {createContext, useContext, useState} from "react";

const CheckoutContext = createContext()

export function CheckoutContextProvider({children}) {
    const [checkoutParams, setCheckoutParams] = useState({})

    const values = {checkoutParams, setCheckoutParams}
    return <CheckoutContext.Provider value={values}>{children}</CheckoutContext.Provider>
}

export function useCheckoutContext() {
    return useContext(CheckoutContext)
}
