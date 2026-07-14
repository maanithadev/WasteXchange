import {lazy, Suspense} from "react"
import {Route, Routes} from "react-router-dom";

const GuestsHome = lazy(() => import("./pages/guests/GuestsHome.jsx"));
const GuestsNavbar = lazy(() => import("./components/guests/GuestsNavbar.jsx"));
const GuestsFooter = lazy(() => import("./components/guests/GuestsFooter.jsx"));
const GuestsAbout = lazy(() => import("./pages/guests/GuestsAbout.jsx"));
const GuestsBrowseMarketplace = lazy(() => import("./pages/guests/GuestsBrowseMarketplace.jsx"));
const GuestsListingDetail = lazy(() => import("./pages/guests/GuestsListingDetail.jsx"));
const GuestsLogin = lazy(() => import("./pages/guests/GuestsLogin.jsx"));
const GuestsSignup = lazy(() => import("./pages/guests/GuestsSignup.jsx"));
const GuestsContact = lazy(() => import("./pages/guests/GuestsContact.jsx"));
const SellerSidebar = lazy(() => import("./components/sellers/SellerSidebar.jsx"));
const SellerNavbar = lazy(() => import("./components/sellers/SellerNavbar.jsx"));
const SellerDashboard = lazy(() => import("./pages/sellers/SellerDashboard.jsx"));
const SellerUploadWaste = lazy(() => import("./pages/sellers/SellerUploadWaste.jsx"));
const SellerMyListings = lazy(() => import("./pages/sellers/SellerMyListings.jsx"));
const SellerListingStatus = lazy(() => import("./pages/sellers/SellerListingStatus.jsx"));
const SellerOrdersReceived = lazy(() => import("./pages/sellers/SellerOrdersReceived.jsx"));
const SellerMessages = lazy(() => import("./pages/sellers/SellerMessages.jsx"));
const SellerCarbonFootprintDashboard = lazy(() => import("./pages/sellers/SellerCarbonFootprintDashboard.jsx"));
const SellerEarnings = lazy(() => import("./pages/sellers/SellerEarnings.jsx"));
const SellerSettings = lazy(() => import("./pages/sellers/SellerSettings.jsx"));
const BuyerSidebar = lazy(() => import("./components/buyers/BuyerSidebar.jsx"));
const BuyerNavbar = lazy(() => import("./components/buyers/BuyerNavbar.jsx"));
const BuyerDashboard = lazy(() => import("./pages/buyers/BuyerDashboard.jsx"));
const BuyerBrowseMarketplace = lazy(() => import("./pages/buyers/BuyerBrowseMarketplace.jsx"));
const BuyerListingDetail = lazy(() => import("./pages/buyers/BuyerListingDetail.jsx"));
const BuyerMatchedRecommendations = lazy(() => import("./pages/buyers/BuyerMatchedRecommendations.jsx"));
const BuyerMyOrders = lazy(() => import("./pages/buyers/BuyerMyOrders.jsx"));
const BuyerMessages = lazy(() => import("./pages/buyers/BuyerMessages.jsx"));
const BuyerCarbonFootprintDashboard = lazy(() => import("./pages/buyers/BuyerCarbonFootprintDashboard.jsx"));
const BuyerPayment = lazy(() => import("./pages/buyers/BuyerPayment.jsx"));
const BuyerSettings = lazy(() => import("./pages/buyers/BuyerSettings.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const BuyerPaymentSuccess = lazy(() => import("./pages/buyers/BuyerPaymentSuccess.jsx"));
const BuyerPaymentFailed = lazy(() => import("./pages/buyers/BuyerPaymentFailed.jsx"));

import ProtectedSellerRoutes from "./auth/ProtectedSellerRoutes.jsx";
import ProtectedBuyerRoutes from "./auth/ProtectedBuyerRoutes.jsx";
import Loading from "./components/Loading.jsx";
import InitiateCheckout from "./pages/buyers/InitiateCheckout.jsx";

const App = () => {
    return (
        <Suspense fallback={<Loading/>}>
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
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Route>
                </Route>

                {/*sellers*/}
                <Route element={<ProtectedSellerRoutes/>}>
                    <Route element={<SellerSidebar/>}>
                        <Route element={<SellerNavbar/>}>
                            <Route path="/seller/dashboard" element={<SellerDashboard/>}/>
                            <Route path="/seller/upload-waste" element={<SellerUploadWaste/>}/>
                            <Route path="/seller/my-listings" element={<SellerMyListings/>}/>
                            <Route path="/seller/listing-matches" element={<SellerListingStatus/>}/>
                            <Route path="/seller/orders-received" element={<SellerOrdersReceived/>}/>
                            <Route path="/seller/messages" element={<SellerMessages/>}/>
                            <Route path="/seller/carbon-footprint" element={<SellerCarbonFootprintDashboard/>}/>
                            <Route path="/seller/payments" element={<SellerEarnings/>}/>
                            <Route path="/seller/settings" element={<SellerSettings/>}/>
                        </Route>
                    </Route>
                </Route>

                {/*buyers*/}
                <Route element={<ProtectedBuyerRoutes/>}>
                    <Route element={<BuyerSidebar/>}>
                        <Route element={<BuyerNavbar/>}>
                            <Route path="/buyer/dashboard" element={<BuyerDashboard/>}/>
                            <Route path="/buyer/browse-marketplace" element={<BuyerBrowseMarketplace/>}/>
                            <Route path="/buyer/matched-recommendations" element={<BuyerMatchedRecommendations/>}/>
                            <Route path="/buyer/listing-detail/:id" element={<BuyerListingDetail/>}/>
                            <Route path="/buyer/payment-success" element={<BuyerPaymentSuccess/>}/>
                            <Route path="/buyer/payment-failed" element={<BuyerPaymentFailed/>}/>
                            <Route path="/buyer/my-orders" element={<BuyerMyOrders/>}/>
                            <Route path="/buyer/messages" element={<BuyerMessages/>}/>
                            <Route path="/buyer/carbon-footprint" element={<BuyerCarbonFootprintDashboard/>}/>
                            <Route path="/buyer/checkout" element={<BuyerPayment/>}/>
                            <Route path="/buyer/settings" element={<BuyerSettings/>}/>
                        </Route>
                    </Route>
                    <Route path="/initiate-checkout" element={<InitiateCheckout/>}/>
                </Route>

            </Routes>
        </Suspense>
    )
}

export default App
