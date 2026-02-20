import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/auth/LoginPage';
import HRDashboard from './pages/dashboard/HRDashboard';
import ManagerDashboard from './pages/dashboard/ManagerDashboard';
import EmployeeDashboard from './pages/dashboard/EmployeeDashboard';
import OrgOverview from './pages/org/OrgOverview';
import EmployeeDirectory from './pages/org/EmployeeDirectory';
import EvaluationPage from './pages/evaluation/EvaluationPage';
import ReviewPage from './pages/review/ReviewPage';
import ProgramsPage from './pages/programs/ProgramsPage';
import './styles/index.css';

function DashboardRouter() {
  const { user } = useAuth();
  if (user.role === 'hr') return <HRDashboard />;
  if (user.role === 'manager') return <ManagerDashboard />;
  return <EmployeeDashboard />;
}

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return <MainLayout>{children}</MainLayout>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
      <Route path="/organization" element={<ProtectedRoute allowedRoles={['manager', 'hr']}><OrgOverview /></ProtectedRoute>} />
      <Route path="/employees" element={<ProtectedRoute allowedRoles={['manager', 'hr']}><EmployeeDirectory /></ProtectedRoute>} />
      <Route path="/evaluations" element={<ProtectedRoute><EvaluationPage /></ProtectedRoute>} />
      <Route path="/reviews" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
      <Route path="/programs" element={<ProtectedRoute><ProgramsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
