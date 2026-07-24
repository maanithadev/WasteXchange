import {lazy} from "react"
import {Route, Routes} from "react-router-dom"
import ProtectedAdminRoutes from "./auth/ProtectedAdminRoutes"
import {SidebarProvider} from "./contexts/SidebarContext"
import {Toaster} from 'react-hot-toast';
import NotFoundPage from "./pages/NotFoundPage.jsx";
import BackendUsersManagement from "./pages/admin/BackendUsersManagement.jsx";

const Login = lazy(() => import("./pages/admin/./Login"));
const ForgotPassword = lazy(() => import("./pages/admin/./ForgotPassword"));
const Signup = lazy(() => import("./pages/admin/./Signup"));
const Sidebar = lazy(() => import("./components/admin/AdminSidebar"))
const Navbar = lazy(() => import("./components/admin/AdminNavbar"))
const Dashboard = lazy(() => import("./pages/admin/./Dashboard"))
const UserManagement = lazy(() => import("./pages/admin/./UserManagement"))
const ListingModeration = lazy(() => import("./pages/admin/./ListingModeration"))
// const AIclassNameificationReviewQueue = lazy(() => import("./pages/admin/AdminAIClassificationReviewQueue"))
const Transactions = lazy(() => import("./pages/admin/./Transactions"))
const ReportsAndAnalytics = lazy(() => import("./pages/admin/./ReportsAndAnalytics"))
const SupportResolution = lazy(() => import("./pages/admin/./SupportResolution"))
const NotificationsManagement = lazy(() => import("./pages/admin/./NotificationsManagement"))
const Settings = lazy(() => import("./pages/admin/./Settings"))
const ContactsManagement = lazy(() => import("./pages/admin/ContactsManagement"))

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="*" element={<NotFoundPage/>}/>

                <Route element={<ProtectedAdminRoutes/>}>
                    <Route element={
                        <SidebarProvider>
                            <Sidebar/>
                        </SidebarProvider>
                    }>
                        <Route element={<Navbar/>}>
                            <Route path="/dashboard" element={<Dashboard/>}/>
                            <Route path="/user-management" element={<UserManagement/>}/>
                            <Route path="/backend-users-management" element={<BackendUsersManagement/>}/>
                            <Route path="/listing-moderation" element={<ListingModeration/>}/>
                            {/* <Route path="/ai-classification-review-queue" element={<AIclassNameificationReviewQueue />} /> */}
                            <Route path="/transactions" element={<Transactions/>}/>
                            <Route path="/reports-and-analytics" element={<ReportsAndAnalytics/>}/>
                            <Route path="/support-resolution" element={<SupportResolution/>}/>
                            <Route path="/notifications" element={<NotificationsManagement/>}/>
                            <Route path="/settings" element={<Settings/>}/>
                            <Route path="/contacts-management" element={<ContactsManagement/>}/>
                        </Route>
                    </Route>
                </Route>
            </Routes>
            <Toaster position="bottom-right" reverseOrder={true}/>
        </>
    )
}

export default App
