import { lazy } from "react"
import { Route, Routes } from "react-router-dom"
import ProtectedAdminRoutes from "./auth/ProtectedAdminRoutes"

const AdminSidebar = lazy(() => import("./components/admin/AdminSidebar"))
const AdminNavbar = lazy(() => import("./components/admin/AdminNavbar"))
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"))
const AdminUserManagement = lazy(() => import("./pages/admin/AdminUserManagement"))
const AdminListingModeration = lazy(() => import("./pages/admin/AdminListingModeration"))
const AIclassNameificationReviewQueue = lazy(() => import("./pages/admin/AdminAIClassificationReviewQueue"))
const AdminTransactions = lazy(() => import("./pages/admin/AdminTransactions"))
const AdminReportsAndAnalytics = lazy(() => import("./pages/admin/AdminReportsAndAnalytics"))
const AdminSupportResolution = lazy(() => import("./pages/admin/AdminSupportResolution"))
const AdminNotificationsManagement = lazy(() => import("./pages/admin/AdminNotificationsManagement"))

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedAdminRoutes />}>
          <Route element={<AdminSidebar />}>
            <Route element={<AdminNavbar />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/user-management" element={<AdminUserManagement />} />
              <Route path="/admin/listing-moderation" element={<AdminListingModeration />} />
              {/* <Route path="/admin/ai-classification-review-queue" element={<AIclassNameificationReviewQueue />} /> */}
              <Route path="/admin/transactions" element={<AdminTransactions />} />
              <Route path="/admin/reports-and-analytics" element={<AdminReportsAndAnalytics />} />
              <Route path="/admin/support-resolution" element={<AdminSupportResolution />} />
              <Route path="/admin/notifications" element={<AdminNotificationsManagement />} />
              {/* <Route path="/admin/settings" element={} /> */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
