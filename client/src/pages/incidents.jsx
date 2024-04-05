import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { IncidentsView } from '../sections/incidents';
import { NotFoundView } from '../sections/error';

// ----------------------------------------------------------------------

export default function IncidentsPage() {

  return (
      <>
        <Helmet>
          <title>Incidents</title>
        </Helmet>

        <IncidentsView />
      </>
  );
}
