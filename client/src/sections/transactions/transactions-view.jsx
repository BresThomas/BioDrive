import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import ListItemButton from '@mui/material/ListItemButton';
import TablePagination from '@mui/material/TablePagination';
import MenuItem from '@mui/material/MenuItem';
import { RouterLink } from '../../routes/components';
import { emptyRows, applyFilter, getComparator } from './utils';

import Scrollbar from '../../components/scrollbar';

import TableNoData from './jsx/table-no-data';
import TransactionTableRow from './jsx/transaction-table-row';
import TransactionTableHead from './jsx/transaction-table-head';
import TableEmptyRows from './jsx/table-empty-rows';
import UserTableToolbar from './jsx/transaction-table-toolbar';
import { useTransactions } from '../../_mock/useTransactions';
import { usePathname } from '../../routes/hooks';
import navConfig from '../../layouts/dashboard/config-navigation';

// ----------------------------------------------------------------------

export default function TransactionsView() {

  const navigate = useNavigate();
  const transactions = useTransactions();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('produit');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: transactions,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const initialFormDataTransaction = {
    produit: '',
    quantité: ''
  };

  const [formDataTransaction, setFormDataTransaction] = useState(initialFormDataTransaction);

  const handleChangeTransaction = (event) => {
    const { name, value } = event.target;
    setFormDataTransaction(prevFormDataTransaction => ({
      ...prevFormDataTransaction,
      [name]: value
    }));
  };

  const clickFormTransaction = async () => {
    console.log(formDataTransaction);

    const response = await fetch('http://localhost:3001/api/newClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: formDataTransaction.id_Transaction,
        produit : formDataTransaction.produit,
        quantité : formDataTransaction.quantité
      })
    });

    if (response.ok) {
      // Réinitialiser les champs du formulaire à leur valeur initiale vide
      setFormDataTransaction(initialFormDataTransaction);
      console.log("Formulaire soumis avec succès!");
      window.location.reload(true);
    } else {
      console.error("Erreur lors de la soumission du formulaire");
    }
  };

  const renderFormTransaction = (title) => (
    <Stack spacing={3} direction="row" alignItems="center">
      <Typography variant="h6" sx={{ width: '20%' }}>{title}</Typography>
      <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '55%' }}>
      <TextField name="carburant" value={formDataTransaction.produit} label="Carburant" sx={{ width: '30%' }} onChange={handleChangeTransaction} />
      <TextField name="type" value={formDataTransaction.quantité} label="Type de payement" sx={{ width: '30%' }} onChange={handleChangeTransaction} />
      <TextField name="somme" value={formDataTransaction.somme} label="Somme" sx={{ width: '30%' }} onChange={handleChangeTransaction} />
      </Stack>



      <LoadingButton
        sx={{ width: '30%' }}
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={clickFormTransaction}
      >
        Ajouter
      </LoadingButton>
    </Stack>
  );

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Grid item xs={36} sm={12} md={7} xl={7}>
          <Stack direction="row" spacing={2} sx={{ p: 2, pt: 5 }}>
            {navConfig.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </Stack>
      </Grid>
      <Box pb={3} pt={3} >
          { renderFormTransaction("Ajouter un transaction") }
        </Box>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          title="Transactions"
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <TransactionTableHead
                order={order}
                orderBy={orderBy}
                rowCount={transactions.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'id', label: 'ID' },
                  { id: 'produit', label: 'Produit' },
                  { id: 'quantité', label: 'Quantité' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TransactionTableRow
                    id={row.id}
                    produit={row.produit}
                    quantité={row.quantité}
                    selected={selected.indexOf(row.name) !== -1}
                    />
                    ))}
  
                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, transactions.length)}
                  />
  
                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
  
          <TablePagination
            page={page}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        
      </Container>
    );
  }

  // ----------------------------------------------------------------------
  
  function NavItem({ item }) {
    const pathname = usePathname();
  
    const active = item.path === pathname;
  
    return (
      <ListItemButton
        component={RouterLink}
        href={item.path}
        sx={{
          minHeight: 44,
          borderRadius: 0.75,
          typography: 'body2',
          color: 'text.secondary',
          textTransform: 'capitalize',
          fontWeight: 'fontWeightMedium',
          ...(active && {
            color: 'primary.main',
            fontWeight: 'fontWeightSemiBold',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
            },
          }),
        }}
      >
        <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
          {item.icon}
        </Box>
  
        <Box component="span">{item.title} </Box>
      </ListItemButton>
    );
  }
  
  NavItem.propTypes = {
    item: PropTypes.object,
  };