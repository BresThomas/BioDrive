import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';

import { posts } from '../../_mock/blog';
import PostSearch from '../blog/post-search';
import { RouterLink } from '../../routes/components';
import AppNewsUpdate from '../overview/app-news-update';
import { usePathname, useRouter } from '../../routes/hooks';
import navConfig from '../../layouts/dashboard/config-navigation';
import Boutique from '../../_mock/form/Boutique';
import AjouterTache from '../../_mock/form/AjouterTache';
import AjouterClient from '../../_mock/form/AjouterClient';

// ----------------------------------------------------------------------

const filtreRecherche = ['Tous', 'Nom du produit', 'Identifiant', 'Catégorie'];

export default function DashboardView() {

  const [enteredValue, setEnteredValue] = useState('');

  const handleValueChange = (newValue) => {
    setEnteredValue(newValue);
  };

    const theme = useTheme();
    const router = useRouter();

    const handleClick = () => {
      router.push('/dashboard');
    };    

    const [paymentMode, setPaymentMode] = useState('');

    const ajouterCredit = (title) => (
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6" sx={{ width: '20%' }}>{title}</Typography>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '55%' }}>
          <Typography variant="body1">Montant Bonnus</Typography>
          <TextField name="montant" label="0%" sx={{ width: '20%' }}/>
          <Typography variant="body1">Tranches Bonnus</Typography>
          <TextField name="tranches" label="0%" sx={{ width: '20%' }}/>
          <Typography variant="body1">Montant Minimum</Typography>
          <TextField name="maximum" label="0%" sx={{ width: '20%' }}/>
        </Stack>
        <LoadingButton
          sx={{ width: '20%' }}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
        >
          valider
        </LoadingButton>
      </Stack>
    );

    const searchProductFrom = (
      <Stack spacing={3} direction="row" alignItems="center">
        <PostSearch posts={posts} />
        <Typography variant="h6"> Filtrer par: </Typography>
        <Select
          value={paymentMode}
          onChange={(event) => setPaymentMode(event.target.value)}
          displayEmpty
        >
        <MenuItem value="" disabled>
          Tous
        </MenuItem>
        {filtreRecherche.map((mode) => (
          <MenuItem key={mode} value={mode}>{mode}</MenuItem>
        ))}
          </Select>     
      </Stack>
    );

    const listStock = (
      <Stack alignItems="left">
        <Stack direction="row" alignItems="center">
        <AppNewsUpdate
                sx={{ width: 920, height: 200, overflowY: 'auto' }}
                title="Stocks"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
        </Stack>
      </Stack>
    );  

    const listClient = (
      <Stack alignItems="left">
        <Stack direction="row" alignItems="center">
        <AppNewsUpdate
                sx={{ width: 1020, height: 150, overflowY: 'auto' }}
                title="Liste Clients"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
        </Stack>
      </Stack>
    );  

    

  return (
<Container maxWidth="xxl">
  <Grid container spacing={3}>
    <Grid item xs={12} sm={12} md={5} xl={5}>
      <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
        Principal
      </Typography>
      <Grid container spacing={3}>
            <Grid item >
              <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Grid xs={12.4} md={12.6} lg={12.4}>
                    <Card sx={{ p: 3, width: 1,}}>
                      {searchProductFrom}
                    </Card>
                </Grid>
                <Grid xs={12.4} md={12.6} lg={12.4}>
                    <Card sx={{ p: 0, width: 1, height: 150, }}>
                      {listStock}
                    </Card>
                </Grid>
                <Grid  xs={12.4} md={12.6} lg={12.4}>
                  <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                      {/* form  */}
                      <Card sx={{p: 2, width: 1,}}>
                        <AjouterTache />
                      </Card>               
                      <Card sx={{p: 2, width: 1, mt:3, }}>
                        <Boutique />
                      </Card>
                      <Card sx={{p: 2, width: 1, mt:3, }}>
                        <AjouterClient />
                      </Card>
                  </Stack>
                </Grid>
                <Grid container spacing={1}> 
                  <Grid xs={6} md={6} lg={4}>
                    <AppNewsUpdate
                      sx={{ width: 250, height: 300, overflowY: 'auto'}}
                      title="Planning 📅"
                      list={[...Array(5)].map((_, index) => ({
                        id: faker.string.uuid(),
                        title: faker.person.jobTitle(),
                        description: faker.commerce.productDescription(),
                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                        postedAt: faker.date.recent(),
                      }))}
                    />
                  </Grid>
                  <Grid xs={6} md={6} lg={4}>
                      <AppNewsUpdate
                        sx={{ width: 500, height: 300, overflowY: 'auto', marginLeft: 2 }}
                        title="Tâches 📝"
                        list={[...Array(5)].map((_, index) => ({
                          id: faker.string.uuid(),
                          title: faker.person.jobTitle(),
                          description: faker.commerce.productDescription(),
                          image: `/assets/images/covers/cover_${index + 1}.jpg`,
                          postedAt: faker.date.recent(),
                        }))}
                      />
                  </Grid>
                </Grid>
              </Stack>    
            </Grid>  
      </Grid>
      </Grid>
    <Grid item xs={36} sm={12} md={7} xl={7}>
      <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
        ERP 👋
      </Typography>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
        ))}
      </Stack>
      <Grid container spacing={5}>
        <Grid item >
          <Stack alignItems="center" justifyContent="center" sx={{ height: 1 ,}}>
            <Grid container spacing={1} sx={{ marginBottom: 3 }}> 
              <Grid xs={6} md={6} lg={6} >
                  <AppNewsUpdate
                    sx={{  width: 540, height: 200, overflowY: 'auto'}}
                    title="Stocks à réapprovisionner 📦"
                    list={[...Array(5)].map((_, index) => ({
                    id: faker.string.uuid(),
                    title: faker.person.jobTitle(),
                    description: faker.commerce.productDescription(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                    }))}
                  />
              </Grid>
              <Grid xs={6} md={6} lg={6}>
                  <AppNewsUpdate
                    sx={{  width: 540, height: 200, overflowY: 'auto', marginLeft: 2 }}
                    title="Derniers réapprovisionnements 📦"
                    list={[...Array(5)].map((_, index) => ({
                    id: faker.string.uuid(),
                    title: faker.person.jobTitle(),
                    description: faker.commerce.productDescription(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                    }))}
                  />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ marginBottom: 3 }}> 
              <Grid xs={6} md={6} lg={6}>
                  <AppNewsUpdate
                    sx={{ width: 540, height: 200, overflowY: 'auto'}}
                    title="Niveaux des cuves 🛢️"
                    list={[...Array(5)].map((_, index) => ({
                    id: faker.string.uuid(),
                    title: faker.person.jobTitle(),
                    description: faker.commerce.productDescription(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                    }))}
                  />
              </Grid>
              <Grid xs={6} md={6} lg={6}>
                <AppNewsUpdate
                    sx={{ width: 540, height: 200, overflowY: 'auto', marginLeft: 2 }}
                    title="Modification des prix du carburant ⛽️"
                    list={[...Array(5)].map((_, index) => ({
                    id: faker.string.uuid(),
                    title: faker.person.jobTitle(),
                    description: faker.commerce.productDescription(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                    }))}
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ marginBottom: 3 }}> 
              {/* todo modifier ces deux  pour avoiir titre image boutton */}
              <Grid xs={6} md={6} lg={6}>
                  <AppNewsUpdate
                    sx={{ width: 540, height: 280, overflowY: 'auto'}}
                    title="Table Relevé des Transactions Journalières"
                    list={[...Array(5)].map((_, index) => ({
                    id: faker.string.uuid(),
                    title: faker.person.jobTitle(),
                    description: faker.commerce.productDescription(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                    }))}
                  />
              </Grid>
              <Grid xs={6} md={6} lg={6}>
                  <AppNewsUpdate
                    sx={{ width: 540, height: 280, overflowY: 'auto', marginLeft: 2 }}
                    title="Table Relevé des Incidents"
                    list={[...Array(5)].map((_, index) => ({
                    id: faker.string.uuid(),
                    title: faker.person.jobTitle(),
                    description: faker.commerce.productDescription(),
                    image: `/assets/images/covers/cover_${index + 1}.jpg`,
                    postedAt: faker.date.recent(),
                    }))}
                  />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
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