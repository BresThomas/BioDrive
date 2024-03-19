import { Helmet } from 'react-helmet-async';

import { NotFoundView } from '../sections/error';
import { TransactionsView } from '../sections/transactions';
import AuthWrapper from '../components/auth/AuthWrapper';

// ----------------------------------------------------------------------

export default function TransactionsPage() {
  return (
    <AuthWrapper>
      <>
        <Helmet>
          <title> Transactions </title>
        </Helmet>

        <TransactionsView />
      </>
    </AuthWrapper>
  );
}
