import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import { AuthProvider } from "./context/AuthContext"
import { WishlistProvider } from "./context/WishlistContext"
import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import Login from "./pages/Login"
import Wishlist from "./pages/Wishlist"

import Dashboard from "./dashboard/Dashboard"
import AddMovie from "./dashboard/AddMovie"
import EditMovie from "./dashboard/EditMovie"

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        <Route
          path="/movies"
          element={
            <PageTransition>
              <Movies />
            </PageTransition>
          }
        />

        <Route
          path="/movies/:id"
          element={
            <PageTransition>
              <MovieDetails />
            </PageTransition>
          }
        />

        <Route
          path="/wishlist"
          element={
            <PageTransition>
              <Wishlist />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition>
                <Dashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/add"
          element={
            <ProtectedRoute>
              <PageTransition>
                <AddMovie />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/edit/:id"
          element={
            <ProtectedRoute>
              <PageTransition>
                <EditMovie />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <div className="min-h-screen bg-gray-950">
            <Navbar />
            <AnimatedRoutes />
          </div>
        </Router>
      </WishlistProvider>
    </AuthProvider>
  )
}
