import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { UserView } from '../sections/user/view';
import { NotFoundView } from '../sections/error';
import AuthWrapper from '../components/auth/AuthWrapper';

// ----------------------------------------------------------------------

export default function UserPage() {

  return (
    <AuthWrapper>
      <>
        <Helmet>
          <title>User</title>
        </Helmet>
        <UserView />
      </>
    </AuthWrapper>
  );
}

