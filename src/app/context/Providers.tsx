'use client';

import { ReactNode } from 'react';
import { AppServiceProvider } from './AppServiceContext';

export function Providers({ children }: { children: ReactNode }) {
  return <AppServiceProvider>{children}</AppServiceProvider>;
}
