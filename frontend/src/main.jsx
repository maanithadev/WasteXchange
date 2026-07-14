// import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from './App'
import {CheckoutContextProvider} from "./contexts/CheckoutContext.jsx";
import {WasteListingProvider} from "./contexts/WateListingContext.jsx";

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <CheckoutContextProvider>
        <WasteListingProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </WasteListingProvider>
    </CheckoutContextProvider>
    // </StrictMode>,
)
