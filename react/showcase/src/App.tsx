import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LayoutWrapper from './layouts/LayoutWrapper';
import { routeLayouts, USE_FOUNDATION_AUTH } from './config';
import AuthGuard from './guards/AuthGuard';
import { AuthProvider } from './store/AuthContext';
import LayerProvider from './store/LayerProvider';
// Pages Components
import AdminPage from './pages/admin/AdminPage';
import AnalyticsPage from './pages/analytics/AnalyticsPage';
import AuthPage from './pages/auth/AuthPage';
import AuthMockPage from './pages/auth-mock/AuthMockPage';
import FeaturesLabPage from './pages/features-lab/FeaturesLabPage';
import FiltersPage from './pages/filters/FiltersPage';
import FormsPage from './pages/forms/FormsPage';
import NotificationDashboardPage from './pages/notification-dashboard/NotificationDashboardPage';
import ProtectedPage from './pages/protected/ProtectedPage';
import ReportingPage from './pages/reporting/ReportingPage';
// Genesis Components
import './share/genesis-components';

const LayoutWithLocation = () => {
  const location = useLocation();
  const layout = routeLayouts[location.pathname] || 'default';

  let pageComponent;

  switch (location.pathname) {
    case '/admin':
      pageComponent = <AdminPage />;
      break;
    case '/analytics':
      pageComponent = <AnalyticsPage />;
      break;
    case '/auth':
      pageComponent = <AuthPage />;
      break;
    case '/auth-mock':
      pageComponent = <AuthMockPage />;
      break;
    case '/features-lab':
      pageComponent = <FeaturesLabPage />;
      break;
    case '/filters':
      pageComponent = <FiltersPage />;
      break;
    case '/forms':
      pageComponent = <FormsPage />;
      break;
    case '/notification-dashboard':
      pageComponent = <NotificationDashboardPage />;
      break;
      case '/protected':
        pageComponent = <ProtectedPage />;
        break;
      case '/reporting':
          pageComponent = <ReportingPage />;
      break;
    default:
      pageComponent = USE_FOUNDATION_AUTH ? <AuthPage /> : <AuthMockPage />; 
  }

  if (location.pathname === '/auth' || location.pathname === '/auth-mock' || location.pathname === '/') {
    return <LayoutWrapper layout={layout}>{pageComponent}</LayoutWrapper>;
  } else {
    return (
      <AuthGuard>
        <LayoutWrapper layout={layout}>{pageComponent}</LayoutWrapper>
      </AuthGuard>
    );
  }
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LayerProvider>
        <Router>
          <Routes>
            <Route path="*" element={<LayoutWithLocation />} />
          </Routes>
        </Router>
      </LayerProvider>
    </AuthProvider>
  );
};

export default App;
