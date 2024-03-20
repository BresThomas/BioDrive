import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardView } from '../sections/dashboard';

// ----------------------------------------------------------------------

export default function DashboardPage() {

  return (
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>

        <DashboardView />
      </>
  );
}

