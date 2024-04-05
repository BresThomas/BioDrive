import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { StocksView } from '../sections/stocks';
import { NotFoundView } from '../sections/error';

// ----------------------------------------------------------------------

export default function StocksPage() {

  return (
      <>
        <Helmet>
          <title>Stocks</title>
        </Helmet>

        <StocksView />
      </>
  );
}