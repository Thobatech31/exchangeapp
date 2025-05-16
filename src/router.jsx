import { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Header from "./organisms/Header"

const Dashboard = lazy(() => import("./pages/Dashboard"))
const Markets = lazy(() => import("./pages/Markets"))
const Wallet = lazy(() => import("./pages/Wallet"))
const Profile = lazy(() => import("./pages/Profile"))
const Auth = lazy(() => import("./pages/Auth"))

const AppRouter = () => (
  <div className="app-container">
    <Header />
    <Suspense fallback={<div className="loading-fallback">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Suspense>
  </div>
)

export default AppRouter
