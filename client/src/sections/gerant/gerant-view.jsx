import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import InputAdornment from '@mui/material/InputAdornment';

import { posts } from '../../_mock/blog';
import PostSearch from '../blog/post-search';
import AppTasks from '../overview/app-tasks';
import Iconify from '../../components/iconify';
import AppNumPad from '../overview/app-numpad';
import Popup from '../../components/popup/popup';
import { RouterLink } from '../../routes/components';
import AppNewsUpdate from '../overview/app-news-update';
import { usePathname, useRouter } from '../../routes/hooks';
import { NAV } from '../../layouts/dashboard/config-layout';
import AppOrderTimeline from '../overview/app-order-timeline';
import AppCurrentVisits from '../overview/app-current-visits';
import AppWebsiteVisits from '../overview/app-website-visits';
import AppWidgetSummary from '../overview/app-widget-summary';
import AppTrafficBySite from '../overview/app-traffic-by-site';
import AppCurrentSubject from '../overview/app-current-subject';
import AppConversionRates from '../overview/app-conversion-rates';
import navConfig from '../../layouts/dashboard/config-navigation';

// ----------------------------------------------------------------------

const filtreRecherche = ['Tous', 'Nom du produit', 'Identifiant', 'Catégorie'];

export default function GerantView() {

  const [enteredValue, setEnteredValue] = useState('');

  const handleValueChange = (newValue) => {
    setEnteredValue(newValue);
  };

    const theme = useTheme();
    const router = useRouter();

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3001/api')
        .then((response) => response.json())
        .then((data) => {
          // Assurez-vous que les données sont un tableau
          if (Array.isArray(data)) {
            setProducts(data);
          } else {
            console.error("Les données reçues ne sont pas un tableau.");
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    }, []);

    const handleClick = () => {
      router.push('/dashboard');
    };

    const [paymentMode, setPaymentMode] = useState('');
    
    const renderFormClient = (title) => (
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6" sx={{ width: '25%' }}>{title}</Typography>
        <Stack spacing={3} direction="row" alignItems="center">
          <PostSearch posts={posts}/>
          <TextField name="email" label="Quantité" sx={{ width: '60%' }}/>
          <TextField name="email" label="Adresse livraison" sx={{ width: '70%' }}/>
          <TextField name="email" label="Date livraison" sx={{ width: '70%' }}/>
          <TextField name="email" label="Prix" sx={{ width: '40%' }}/>
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
    );

    const renderFormIncident = (title) => (
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6" sx={{ width: '20%' }}>{title}</Typography>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '55%' }}>
          <TextField name="intitule" label="Intitulé" sx={{ width: '30%' }}/>
          <TextField name="descriptionIncident" label="Description de l'incident" sx={{ width: '70%' }}/>
        </Stack>
        <LoadingButton
          sx={{ width: '20%' }}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
        >
          Submit
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
        <Typography variant="h3">Stocks</Typography>
        <Stack direction="row" alignItems="center">
        <AppNewsUpdate
                sx={{ width: 920, height: 200, overflowY: 'auto' }}
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
        <Typography variant="h6">Liste Clients</Typography>
        <Stack direction="row" alignItems="center">
        <AppNewsUpdate
                sx={{ width: 1020, height: 180, overflowY: 'auto' }}
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
                Caisse 💶
                </Typography>
            <Grid container spacing={3}>
              <Grid item >
                <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Grid xs={12.4} md={12.6} lg={12.4}>
                    <Card
                      sx={{
                        p: 3,
                        width: 1,
                      }}
                      >
                      {searchProductFrom}
                    </Card>
                  </Grid>
                <Grid xs={12.4} md={12.6} lg={12.4}>
                    <Card
                      sx={{
                        p: 3,
                        width: 1,
                      }}
                      >
                      {listStock}
                    </Card>
                  </Grid>
                  <Grid container spacing={40}> 
                    <Grid xs={6} md={6} lg={4}>
                      <AppNewsUpdate sx={{ width: 350, height: 450, overflowY: 'auto' }}
                        title="Planning 📅"
                        path="/users"
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
                          sx={{ width: 450, height: 450, overflowY: 'auto' }}
                          title="Rechercher Client 👤"
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
          <Grid xs={12.4} md={12.6} lg={12.4}>
            <Card
              sx={{
                p: 3,
                width: 1,
              }}
              >
              {listClient}
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={3} pt={3}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card
                sx={{
                  p: 3,
                  width: 1,
                }}
              >
                {renderFormIncident('Carte Crédit Énergie ⚡️')}
              </Card>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3} pt={3} spacing={3}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card
                sx={{
                  p: 3,
                  width: 1,
                }}
              >
                {renderFormIncident('Ajouter Service 🛠️')}
              </Card>
            </Stack>
          </Grid>

          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <AppNewsUpdate sx={{ width: 520, height: 150, overflowY: 'auto' }}
                title="Parkings disponibles 🚗"
                path="/users"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
            </Grid>
              <Grid xs={12} md={6} lg={4}>
                <AppNewsUpdate
                  sx={{ width: 520, height: 150, overflowY: 'auto' }}
                  title="Services spéciaux de livraison 🚚"
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
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <AppNewsUpdate sx={{ width: 520, height: 150, overflowY: 'auto' }}
                title="Servces"
                path="/users"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <AppNewsUpdate 
              path="/users"
                sx={{ width: 520, height: 150, overflowX: 'auto', overflowY: 'none',
                  display: 'flex', flexDirection: 'row' }}
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  postedAt: faker.date.recent(),
                }))}
              >
                {({ list }) =>
                  list.map((item) => (
                    <div key={item.id} style={{ display: 'inline-block' }}>
                      <h2>{item.title}</h2>
                      <p>{item.description}</p>
                      <p>{item.postedAt.toString()}</p>
                    </div>
                  ))
                }
              </AppNewsUpdate>
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