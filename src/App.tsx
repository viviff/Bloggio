import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import EditStructure from "./pages/EditStructure";
import EditArticle from "./pages/EditArticle";
import Credits from "./pages/Credits";
import NotFound from "./pages/NotFound";
import ArticleForm from '@/components/article/ArticleForm';

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/edit-structure/:id" element={
          <ProtectedRoute>
            <EditStructure />
          </ProtectedRoute>
        } />
        <Route path="/edit-article/:id" element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        } />
        <Route path="/credits" element={
          <ProtectedRoute>
            <Credits />
          </ProtectedRoute>
        } />
        <Route path="/article-form" element={
          <ProtectedRoute>
            <ArticleForm />
          </ProtectedRoute>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
