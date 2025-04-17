
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForms from '@/components/AuthForms';
import { loadAuthState } from '@/utils/auth-utils';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const { isAuthenticated } = loadAuthState();
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);
  
  const handleAuthSuccess = () => {
    navigate('/');
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          Daily Spend Glimpse
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          Track your expenses and take control of your finances
        </p>
      </div>
      
      <AuthForms onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default AuthPage;
