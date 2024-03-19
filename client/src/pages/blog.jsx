import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { BlogView } from '../sections/blog/view';
import AuthWrapper from '../components/auth/AuthWrapper';

// ----------------------------------------------------------------------

export default function BlogPage() {

  return (
    <AuthWrapper>
      <>
        <Helmet>
          <title>Blog | Minimal UI</title>
        </Helmet>

        <BlogView />
      </>
    </AuthWrapper>
  );
}
