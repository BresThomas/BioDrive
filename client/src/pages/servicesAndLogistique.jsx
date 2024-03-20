import { Helmet } from 'react-helmet-async';

import { NotFoundView } from '../sections/error';
import { ServicesAndLogistiqueView } from '../sections/servicesAndLogistique';

// ----------------------------------------------------------------------

export default function ServicesAndLogistiquePage() {
  return (
    <>
      <Helmet>
        <title>Services et Logistique</title>
      </Helmet>
      <ServicesAndLogistiqueView />
    </>
  );
}
