import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Stack, Box, Link, Typography, Divider, Button } from '@mui/material';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';

function TransactionList({ transactions }) {
  return (
    <Card>
      <CardHeader title="Liste des transactions" />
      <Stack spacing={2} sx={{ p: 3, pr: 0 }}>
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
          Voir toutes les transactions
        </Button>
      </Box>
    </Card>
  );
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      productId: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      paymentMethod: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function TransactionItem({ transaction }) {
  const { productId, productName, price, quantity, paymentMethod, timestamp } = transaction;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="subtitle2" noWrap>{productId}</Typography>
      <Typography variant="subtitle2" noWrap>{productName}</Typography>
      <Typography variant="subtitle2" noWrap>{price}</Typography>
      <Typography variant="subtitle2" noWrap>{quantity}</Typography>
      <Typography variant="subtitle2" noWrap>{paymentMethod}</Typography>
    </Stack>
  );
}

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
};

export default TransactionList;