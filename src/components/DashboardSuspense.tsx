import React from 'react';
import { Dashboard } from './Dashboard';
import { FullScreenSpinner } from './FullScreenSpinner';

interface DefaultSuspenseProps {
  children: React.ReactNode;
}

export function DashboardSuspense(props: DefaultSuspenseProps) {
  const { children } = props;
  return (
    <React.Suspense
      fallback={
        <Dashboard>
          <FullScreenSpinner />
        </Dashboard>
      }
    >
      {children}
    </React.Suspense>
  );
}
