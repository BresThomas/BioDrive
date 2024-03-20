import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { ServicesLogistiqueView } from '../sections/ServicesLogistique';
import { NotFoundView } from '../sections/error';

// ----------------------------------------------------------------------

export default function ServicesLogistiquePage() {

  return (
      <>
        <Helmet>
          <title>Services Logistique</title>
        </Helmet>
        <ServicesLogistiqueView />
      </>
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
