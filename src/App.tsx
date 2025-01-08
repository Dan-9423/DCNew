import { ThemeProvider } from './components/ThemeProvider';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import TopBanner from './components/TopBanner';
import DashboardNav from './components/DashboardNav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const showDashboardNav = !['/profile', '/', '/settings'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#111111]">
      <div className="max-w-[1600px] mx-auto flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <TopBanner />
          {showDashboardNav && <DashboardNav />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/*"
                element={
                  <RequireAuth>
                    <AppContent />
                  </RequireAuth>
                }
              />
            </Routes>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}