import React from 'react';
import { FullScreenSpinner } from './FullScreenSpinner';

interface DefaultSuspenseProps {
  children: React.ReactNode;
}

export function DefaultSuspense(props: DefaultSuspenseProps) {
  const { children } = props;
  return (
    <React.Suspense fallback={<FullScreenSpinner />}>{children}</React.Suspense>
  );
}
