import React, { createContext, useContext, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithTransition = useCallback((targetPath) => {
    if (location.pathname === targetPath) return;

    if (targetPath === '/') {
      navigate('/');
    } else {
      sessionStorage.setItem('showCurtain', 'true');
      navigate(targetPath);
    }
  }, [location.pathname, navigate]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning: false }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
}
