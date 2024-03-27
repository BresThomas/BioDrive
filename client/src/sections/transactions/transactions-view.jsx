import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

import Grid from '@mui/material/Unstable_Grid2';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Card, CardContent } from '@mui/material';
import { useRouter } from '../../routes/hooks';
import AppNewsUpdate from '../overview/app-news-update';

import { auth } from '../../Firebase';

import { RouterLink } from '../../routes/components';

import Logo from '../../components/logo';
import { users } from '../../_mock/user';
import { applyFilter, getComparator } from '../user/utils';
import PostSearch from '../blog/post-search';
import { posts } from '../../_mock/blog';

// ----------------------------------------------------------------------

export default function TransactionsView() {
  
  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          navigate('/transactions'); 
        } else {
          // User is signed out
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
  const [hello, setHello] = useState('');

  const router = useRouter();

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const handleClick = () => {
    router.push('/dashboard');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          top: 0,
          left: 0,
          width: 1,
          lineHeight: 0,
          position: 'fixed',
          p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
        }}
      >
        <Logo />
      </Box>
      <Grid container spacing={2}>
      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 1050,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, margin: 2 }}>
            Dashboard transactions
          </Typography>

          <Box width="100%" sx={{margin: 1}}>
              <Card>
                <CardContent>
                  <Stack spacing={3} direction="row" alignItems="center">
                    <Typography variant="h6">Enregistrer une transaction</Typography>

                    <Stack spacing={3} direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
                      <PostSearch posts={posts} />
                      <TextField name="quantity" label="Quantité" />
                      <TextField name="deliveryAddress" label="Adresse livraison" />
                      <TextField name="deliveryDate" label="Date livraison" />
                      <TextField name="price" label="Prix" />
                    </Stack>

                    <LoadingButton
                      sx={{ width: '22.5%' }}
                      size="large"
                      type="submit"
                      variant="contained"
                      color="inherit"
                      onClick={handleClick}
                    >
                      Submit
                    </LoadingButton>
                  </Stack>
                </CardContent>
              </Card>
            </Box>

          <Grid xs={12} md={6} lg={8} sx ={{margin: 1}}>
            <AppNewsUpdate
              title="Past transactions"
              path="/user"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: faker.person.jobTitle(),
                description: faker.commerce.productDescription(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Button sx={{margin: 1}} href="/dashboard" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </Box>
        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      
      </Grid>
    </>
  );
}