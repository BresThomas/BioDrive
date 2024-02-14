import { Helmet } from 'react-helmet-async';

import { AppView } from '../sections/overview/view';
import { DashboardView } from '../sections/dashboard';

// ----------------------------------------------------------------------

export default function DashboardPage () {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <DashboardView />
    </>
  );
}
