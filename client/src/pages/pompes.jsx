import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { PompesView } from '../sections/pompes';
import { NotFoundView } from '../sections/error';

// ----------------------------------------------------------------------

export default function PompesPage() {

  return (
      <>
        <Helmet>
          <title>Pompes</title>
        </Helmet>

        <PompesView />
      </>
  );
}
