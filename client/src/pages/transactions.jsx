import { Helmet } from 'react-helmet-async';

import { NotFoundView } from '../sections/error';
import { TransactionsView } from '../sections/transactions';

// ----------------------------------------------------------------------

export default function TransactionsPage() {
  return (
      <>
        <Helmet>
          <title> Transactions </title>
        </Helmet>

        <TransactionsView />
      </>
  );
}
