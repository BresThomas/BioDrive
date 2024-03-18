// pages/ServicesLogistique.jsx

import React from 'react';
import { Helmet } from 'react-helmet-async';

import { ServicesLogistiqueView } from '../sections/ServicesLogistique';

function ServicesLogistiquePage(){
  return (
    <>
      <Helmet>
        <title>Services Logistique</title>
      </Helmet>
      <ServicesLogistiqueView />
    </>
  );
};

export default ServicesLogistiquePage;







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
