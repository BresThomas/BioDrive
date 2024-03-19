import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { ServicesLogistiqueView } from '../sections/ServicesLogistique';
import { NotFoundView } from '../sections/error';
import AuthWrapper from '../components/auth/AuthWrapper';

// ----------------------------------------------------------------------

export default function ServicesLogistiquePage() {

  return (
    <AuthWrapper>
      <>
        <Helmet>
          <title>Services Logistique</title>
        </Helmet>
        <ServicesLogistiqueView />
      </>
    </AuthWrapper>
  );
}





/* import { Helmet } from 'react-helmet-async';

import { ServicesLogistiqueView } from '../sections/ServicesLogistique';

// ----------------------------------------------------------------------

export default function ServicesLogistiquePage() {
  return (
    <>
      <Helmet>
        <title> Services & Logistique </title>
      </Helmet>
    
    <ServicesLogistiqueView />
    </>
  );
} */
