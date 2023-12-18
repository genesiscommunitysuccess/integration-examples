import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthorized = authService.isUserAuthenticated(); 

  if (!isAuthorized) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
