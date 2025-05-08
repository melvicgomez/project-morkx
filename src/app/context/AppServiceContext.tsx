// contexts/AppServiceContext.tsx
import { createContext, useContext } from 'react';
import { AppService } from '../services/app-service';

const appService = new AppService();

const AppServiceContext = createContext<AppService | null>(null);

export const AppServiceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <AppServiceContext.Provider value={appService}>
    {children}
  </AppServiceContext.Provider>
);

export const useAppService = () => {
  const context = useContext(AppServiceContext);
  if (!context)
    throw new Error('useAppService must be used within AppServiceProvider');
  return context;
};
