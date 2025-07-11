import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import TermsAndPrivacyPage from './pages/TermsAndPrivacy';
import ForgotPassword from "./pages/ForgotPassword"; // ✅ Import added

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Layout Component
const Layout = ({ children, showNavbar = true, showFooter = true }: {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
}) => (
  <div className="min-h-screen flex flex-col">
    {showNavbar && <Navbar />}
    <main className="flex-1">{children}</main>
    {showFooter && <Footer />}
  </div>
);

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <Layout>
          <LandingPage />
        </Layout>
      } />

      <Route path="/login" element={
        user ? <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace /> : (
          <Layout showNavbar={false} showFooter={false}>
            <Login />
          </Layout>
        )
      } />

      <Route path="/signup" element={
        user ? <Navigate to="/dashboard" replace /> : (
          <Layout showNavbar={false} showFooter={false}>
            <Signup />
          </Layout>
        )
      } />

      {/* ✅ Forgot Password Route */}
      <Route path="/forgot-password" element={
        <Layout showNavbar={false} showFooter={false}>
          <ForgotPassword />
        </Layout>
      } />

      {/* Terms and Conditions */}
      <Route path="/terms-and-privacy" element={
        <Layout>
          <TermsAndPrivacyPage />
        </Layout>
      } />

      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['user', 'admin']}>
          <Layout>
            <UserDashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout>
            <AdminDashboard />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Catch-all route */}
      <Route path="*" element={
        <Layout>
          <NotFound />
        </Layout>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
