import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
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

