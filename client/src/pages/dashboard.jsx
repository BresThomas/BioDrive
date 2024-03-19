import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { DashboardView } from '../sections/dashboard';
import AuthWrapper from '../components/auth/AuthWrapper';

// ----------------------------------------------------------------------

export default function DashboardPage() {

  return (
    <AuthWrapper>
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>

        <DashboardView />
      </>
    </AuthWrapper>
  );
}

