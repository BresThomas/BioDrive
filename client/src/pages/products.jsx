import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { ProductsView } from '../sections/products/view';
import { NotFoundView } from '../sections/error';
import AuthWrapper from '../components/auth/AuthWrapper';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  return (
    <AuthWrapper>
      <>
        <Helmet>
          <title>Products</title>
        </Helmet>

        <ProductsView />
      </>
    </AuthWrapper>
  );
}
