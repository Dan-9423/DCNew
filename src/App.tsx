import { ThemeProvider } from './components/ThemeProvider';
import { UserProvider } from './contexts/UserContext';
import { AuthProvider } from './contexts/AuthContext';
import { CustomerProvider } from './contexts/CustomerContext';
import { EmailTemplateProvider } from './contexts/EmailTemplateContext';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import TopBanner from './components/TopBanner';
import DashboardNav from './components/DashboardNav';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

// Import new pages
import ContasSemanais from './pages/relatorios/ContasSemanais';
import ContasMensais from './pages/relatorios/ContasMensais';
import Fechamento from './pages/relatorios/Fechamento';
import Sacados from './pages/emails/Sacados';
import EnviarEmail from './pages/emails/EnviarEmail';
import TemplateEmail from './pages/emails/TemplateEmail';

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
      <div className="flex h-screen max-w-[1600px] mx-auto">
        <div className="flex-none">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-8">
          <TopBanner />
          {showDashboardNav && <DashboardNav />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Report Routes */}
            <Route path="/relatorios/contas-semanais" element={<ContasSemanais />} />
            <Route path="/relatorios/contas-mensais" element={<ContasMensais />} />
            <Route path="/relatorios/fechamento" element={<Fechamento />} />
            
            {/* Email Routes */}
            <Route path="/emails/sacados" element={<Sacados />} />
            <Route path="/emails/enviar" element={<EnviarEmail />} />
            <Route path="/emails/template" element={<TemplateEmail />} />
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
            <CustomerProvider>
              <EmailTemplateProvider>
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
              </EmailTemplateProvider>
            </CustomerProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}