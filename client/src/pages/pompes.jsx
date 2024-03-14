import { Helmet } from 'react-helmet-async';

import { NotFoundView } from '../sections/error';
import { PompesView } from '../sections/pompes';

// ----------------------------------------------------------------------

export default function PompesPage() {
  return (
    <>
      <Helmet>
        <title> Pompes </title>
      </Helmet>

      <PompesView />
    </>
  );
}
