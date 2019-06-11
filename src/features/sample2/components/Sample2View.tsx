import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { Link } from 'typeless-router';

export const Sample2View = () => {
  return (
    <Dashboard>
      Feature sample2 <br />
      <Link href="/">Go to sample feature 1</Link>
    </Dashboard>
  );
};
