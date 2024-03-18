import { Helmet } from 'react-helmet-async';

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
}
