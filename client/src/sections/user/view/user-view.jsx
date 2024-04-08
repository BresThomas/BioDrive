import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { onAuthStateChanged } from 'firebase/auth';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import ListItemButton from '@mui/material/ListItemButton';
import TablePagination from '@mui/material/TablePagination';

import { auth } from '../../../Firebase';
import { useUsers } from '../../../_mock/useUsers';

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import { usePathname, useRouter } from '../../../routes/hooks';
import { RouterLink } from '../../../routes/components';

import navConfig from '../../../layouts/dashboard/config-navigation';

export default function UserPage() {

  const navigate = useNavigate();
  const users = useUsers();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        navigate('/user');
      } else {
        navigate('/login');
      }
    });

  }, [navigate])

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
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
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const initialFormDataClient = {
    email: '',
    nom: '',
    prenom: '',
    date_naissance: '',
    tel: '',
    adresse_post: '',
  };

  const [formDataClient, setFormDataClient] = useState(initialFormDataClient);

  const handleChangeClient = (event) => {
    const { name, value } = event.target;
    setFormDataClient(prevFormDataClient => ({
      ...prevFormDataClient,
      [name]: value
    }));
  };

  const clickFormClient = async () => {
    console.log(formDataClient);

    const response = await fetch('http://localhost:3001/api/newClient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formDataClient.email,
        nom: formDataClient.nom,
        prenom: formDataClient.prenom,
        date_naissance: formDataClient.date_naissance,
        numero_portable: formDataClient.tel,
        adresse: formDataClient.adresse_post,
      })
    });

    if (response.ok) {
      // Réinitialiser les champs du formulaire à leur valeur initiale vide
      setFormDataClient(initialFormDataClient);
      console.log("Formulaire soumis avec succès!");
      window.location.reload(true);
    } else {
      console.error("Erreur lors de la soumission du formulaire");
    }
  };

  const renderFormClient = (title) => (
    <Card
    sx={{
      p: 3,
      width: 1,
    }}
    >
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6" sx={{ width: '25%' }}>{title}</Typography>
        <Stack spacing={3} direction="row" alignItems="center">
          <TextField name="email" value={formDataClient.email} label="Email" sx={{ width: '40%' }} onChange={handleChangeClient}/>
          <TextField name="nom" value={formDataClient.nom} label="Nom" sx={{ width: '40%' }} onChange={handleChangeClient}/>
          <TextField name="prenom" value={formDataClient.prenom} label="Prénom" sx={{ width: '40%' }} onChange={handleChangeClient}/>
          <TextField name="tel" value={formDataClient.tel} label="Tel." sx={{ width: '40%' }} onChange={handleChangeClient}/>
          <TextField name="adresse_post" value={formDataClient.adresse_post} label="Adresse Post." sx={{ width: '40%' }} onChange={handleChangeClient}/>
          <TextField name="date_naissance" value={formDataClient.date_naissance} label="Date de Naissance" sx={{ width: '40%' }} onChange={handleChangeClient}/>
        </Stack>
        <LoadingButton
          sx={{ width: '22.5%' }}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={clickFormClient}
        >
          Ajouter
        </LoadingButton>
      </Stack>
    </Card>
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
          { renderFormClient("Ajouter un client") } 
        </Box>
      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          title="Clients 👤"
        />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Nom et prénom' },
                  { id: 'id_compte_energie', label: 'ID Compte énergie', align: 'center' },
                  { id: 'phone', label: 'Numero de téléphone' },
                  { id: 'adresse', label: 'Adresse' },
                  { id: 'date_naissance', label: 'Date de naissance', align: 'center' },
                  { id: 'transactions', label: 'Liste des transactions' }, // Ajout de la colonne transactions
                  { id: 'paiements', label: 'Paiements' }, // Ajout de la colonne paiements
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      name={row.name}
                      id_compte_energie={row.id_compte_energie}
                      phone={row.phone}
                      adresse={row.adresse}
                      avatarUrl={row.avatarUrl}
                      date_naissance={row.date_naissance}
                      transactions={row.transactions}
                      paiements={row.paiements}
                      selected={selected.indexOf(row.name) !== -1}
                      id={row.id}
                    />
                  ))}
                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />
                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

  
          <TablePagination
            page={page}
            component="div"
            count={users.length}
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
  