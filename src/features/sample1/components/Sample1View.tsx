import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { Link } from 'typeless-router';

export const Sample1View = () => {
  return (
    <Dashboard>
      Feature sample1
      <br />
      <Link href="/sample2">
        Go to sample feature 2 (set "slow 3G" to see a spinner)
      </Link>
    </Dashboard>
  );
};
