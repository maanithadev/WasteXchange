import {Route, Routes} from "react-router-dom";
import GuestsHome from "./pages/guests/GuestsHome.jsx";
import GuestsNavbar from "./components/guests/GuestsNavbar.jsx";
import GuestsFooter from "./components/guests/GuestsFooter.jsx";
import GuestsAbout from "./pages/guests/GuestsAbout.jsx";
import GuestsBrowseMarketplace from "./pages/guests/GuestsBrowseMarketplace.jsx";
import GuestsListingDetail from "./pages/guests/GuestsListingDetail.jsx";
import GuestsLogin from "./pages/guests/GuestsLogin.jsx";
import GuestsSignup from "./pages/guests/GuestsSignup.jsx";
import GuestsContact from "./pages/guests/GuestsContact.jsx";
import SellerSidebar from "./components/sellers/SellerSidebar.jsx";
import SellerNavbar from "./components/sellers/SellerNavbar.jsx";
import SellerDashboard from "./pages/sellers/SellerDashboard.jsx";
import SellerUploadWaste from "./pages/sellers/SellerUploadWaste.jsx";
import SellerMyListings from "./pages/sellers/SellerMyListings.jsx";
import SellerListingStatus from "./pages/sellers/SellerListingStatus.jsx";
import SellerOrdersReceived from "./pages/sellers/SellerOrdersReceived.jsx";
import SellerMessages from "./pages/sellers/SellerMessages.jsx";
import SellerCarbonFootprintDashboard from "./pages/sellers/SellerCarbonFootprintDashboard.jsx";
import SellerEarnings from "./pages/sellers/SellerEarnings.jsx";
import SellerSettings from "./pages/sellers/SellerSettings.jsx";
import BuyerSidebar from "./components/buyers/BuyerSidebar.jsx";
import BuyerNavbar from "./components/buyers/BuyerNavbar.jsx";
import BuyerDashboard from "./pages/buyers/BuyerDashboard.jsx";
import BuyerBrowseMarketplace from "./pages/buyers/BuyerBrowseMarketplace.jsx";
import BuyerListingDetail from "./pages/buyers/BuyerListingDetail.jsx";
import BuyerMatchedRecommendations from "./pages/buyers/BuyerMatchedRecommendations.jsx";
import BuyerMyOrders from "./pages/buyers/BuyerMyOrders.jsx";
import BuyerMessages from "./pages/buyers/BuyerMessages.jsx";
import BuyerCarbonFootprintDashboard from "./pages/buyers/BuyerCarbonFootprintDashboard.jsx";
import BuyerPayment from "./pages/buyers/BuyerPayment.jsx";
import BuyerSettings from "./pages/buyers/BuyerSettings.jsx";

const App = () => {
    return (
        <Routes>

            {/*guests*/}
            <Route element={<GuestsNavbar/>}>
                <Route element={<GuestsFooter/>}>
                    <Route path="/" element={<GuestsHome/>}/>
                    <Route path="/browse-marketplace" element={<GuestsBrowseMarketplace/>}/>
                    <Route path="/listing-detail" element={<GuestsListingDetail/>}/>
                    <Route path="/about" element={<GuestsAbout/>}/>
                    <Route path="/login" element={<GuestsLogin/>}/>
                    <Route path="/signup" element={<GuestsSignup/>}/>
                    <Route path="/contact" element={<GuestsContact/>}/>
                </Route>
            </Route>

            {/*sellers*/}
            <Route element={<SellerSidebar/>}>
                <Route element={<SellerNavbar/>}>
                    <Route path="/seller-dashboard" element={<SellerDashboard/>}/>
                    <Route path="/seller-upload-waste" element={<SellerUploadWaste/>}/>
                    <Route path="/seller-my-listings" element={<SellerMyListings/>}/>
                    <Route path="/seller-listing-matches" element={<SellerListingStatus/>}/>
                    <Route path="/seller-orders-received" element={<SellerOrdersReceived/>}/>
                    <Route path="/seller-messages" element={<SellerMessages/>}/>
                    <Route path="/seller-carbon-footprint" element={<SellerCarbonFootprintDashboard/>}/>
                    <Route path="/seller-payments" element={<SellerEarnings/>}/>
                    <Route path="/seller-settings" element={<SellerSettings/>}/>
                </Route>
            </Route>

            {/*buyers*/}
            <Route element={<BuyerSidebar/>}>
                <Route element={<BuyerNavbar/>}>
                    <Route path="/buyer-dashboard" element={<BuyerDashboard/>}/>
                    <Route path="/buyer-browse-marketplace" element={<BuyerBrowseMarketplace/>}/>
                    <Route path="/buyer-matched-recommendations" element={<BuyerMatchedRecommendations/>}/>
                    <Route path="/buyer-listing-detail" element={<BuyerListingDetail/>}/>
                    <Route path="/buyer-my-orders" element={<BuyerMyOrders/>}/>
                    <Route path="/buyer-messages" element={<BuyerMessages/>}/>
                    <Route path="/buyer-carbon-footprint" element={<BuyerCarbonFootprintDashboard/>}/>
                    <Route path="/buyer-checkout" element={<BuyerPayment/>}/>
                    <Route path="/buyer-settings" element={<BuyerSettings/>}/>
                </Route>
            </Route>

        </Routes>
    )
}

export default App
