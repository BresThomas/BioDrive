import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { AppView } from '../sections/overview/view';
import AuthWrapper from '../components/auth/AuthWrapper';

// ----------------------------------------------------------------------

export default function AppPage() {

  return (
    <AuthWrapper>
      <>
        <Helmet>
          <title>Dashboard | Minimal UI</title>
        </Helmet>

        <AppView />
      </>
    </AuthWrapper>
  );
}
