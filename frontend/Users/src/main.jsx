// import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'
import { CheckoutContextProvider } from "./contexts/CheckoutContext.jsx";
import { WasteListingProvider } from "./contexts/WateListingContext.jsx";
import { ConversationsContextProvider } from './contexts/ConversationsContext.jsx';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <CheckoutContextProvider>
        <WasteListingProvider>
            <ConversationsContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ConversationsContextProvider>
        </WasteListingProvider>
    </CheckoutContextProvider>
    // </StrictMode>,
)
