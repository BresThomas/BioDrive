import { faker } from '@faker-js/faker';
import { useState } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import { alpha, useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import PostSearch from '../blog/post-search';
import Iconify from '../../components/iconify';
import { RouterLink } from '../../routes/components';
import { usePathname, useRouter } from '../../routes/hooks';
import Popup from '../../components/popup/popup';


import AppTasks from '../overview/app-tasks';
import AppNewsUpdate from '../overview/app-news-update';
import AppOrderTimeline from '../overview/app-order-timeline';
import AppCurrentVisits from '../overview/app-current-visits';
import AppWebsiteVisits from '../overview/app-website-visits';
import AppWidgetSummary from '../overview/app-widget-summary';
import AppTrafficBySite from '../overview/app-traffic-by-site';
import AppCurrentSubject from '../overview/app-current-subject';
import AppConversionRates from '../overview/app-conversion-rates';

import { NAV } from '../../layouts/dashboard/config-layout';
import navConfig from '../../layouts/dashboard/config-navigation';
import { posts } from '../../_mock/blog';

// ----------------------------------------------------------------------


const paymentModes = ['Cartes bancaire', 'Liquide'];
export default function DashboardView() {
    const theme = useTheme();
    const router = useRouter();

    const handleClick = () => {
      router.push('/dashboard');
    };

    const [paymentMode, setPaymentMode] = useState('');
    
    const renderForm = (
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6">Demande de réappro</Typography>
    
        <Stack spacing={3} direction="row" alignItems="center">
          
          <PostSearch posts={posts} />
          <TextField name="email" label="Quantité" />
          <TextField name="email" label="Adresse livraison" />
          <TextField name="email" label="Date livraison" />
          <TextField name="email" label="Prix" />
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
    
    const addProductFrom = (
      <Stack spacing={3} alignItems="left">
        <Typography variant="h6">Ajout d&apos;un produit</Typography>
    
        <Stack spacing={3} direction="row" alignItems="center">
          <PostSearch posts={posts} />
        <LoadingButton
          sx={{ width: '22.5%' }}
          size="large"
          type="submit"
          variant="outlined"
          color="inherit"
          onClick={handleClick}
          startIcon={<Iconify icon="tabler:reload" />}
          >
          Clear
        </LoadingButton>        
        <LoadingButton
          sx={{ width: '22.5%' }}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
          startIcon={<Iconify icon="fluent:add-12-regular" />}
          >
          Ajouter
        </LoadingButton>
          </Stack>
      </Stack>
    );

    const cashRegisterForm = (
      <Stack spacing={3} alignItems="left">
        <Typography variant="h6">Enregistrement d&apos;un paiement 🧾</Typography>
    
        <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6">Somme total à régler:</Typography>
        <Typography variant="h6">10.45€</Typography>
          
          <Select
        value={paymentMode}
        onChange={(event) => setPaymentMode(event.target.value)}
        displayEmpty
        startAdornment={(
          <InputAdornment position="start">
            <Iconify icon="eva:credit-card-fill" />
          </InputAdornment>
        )}
      >
        <MenuItem value="" disabled>
          Mode de paiement
        </MenuItem>
        {paymentModes.map((mode) => (
          <MenuItem key={mode} value={mode}>{mode}</MenuItem>
        ))}
          </Select>
    
        <LoadingButton
          sx={{ width: '22.5%' }}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
          >
          Proceder au paiement
        </LoadingButton>
          </Stack>
      </Stack>
    );    

  return (
    <Container maxWidth="xxl">


      <Grid container spacing={3}>
        <Grid item xs={36} sm={12} md={7} xl={7}>
          <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
            ERP 👋
          </Typography>
          <Stack direction="row" spacing={2} sx={{ p: 2 }}>
            {navConfig.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </Stack>

        <Grid container spacing={3}>

          <Grid xs={12} sm={6} md={3}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card
                sx={{
                  p: 3,
                  width: 1,
                }}
              >
                {renderForm}
              </Card>
            </Stack>
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppNewsUpdate
              title="Derniers réapprovisionnements"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: faker.person.jobTitle(),
                description: faker.commerce.productDescription(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sales"
              total={714000}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Item Orders"
              total={1723315}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chart={{
                labels: [
                  '01/01/2003',
                  '02/01/2003',
                  '03/01/2003',
                  '04/01/2003',
                  '05/01/2003',
                  '06/01/2003',
                  '07/01/2003',
                  '08/01/2003',
                  '09/01/2003',
                  '10/01/2003',
                  '11/01/2003',
                ],
                series: [
                  {
                    name: 'Team A',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Team B',
                    type: 'area',
                    fill: 'gradient',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Team C',
                    type: 'line',
                    fill: 'solid',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chart={{
                series: [
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.string.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', name: 'Create FireStone Logo' },
                { id: '2', name: 'Add SCSS and JS files if required' },
                { id: '3', name: 'Stakeholder Meeting' },
                { id: '4', name: 'Scoping & Estimations' },
                { id: '5', name: 'Sprint Showcase' },
              ]}
            />
          </Grid>
        </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={5} xl={5}>
              <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
              Caisse
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
                    {addProductFrom}
                  </Card>
                </Grid>
                <Grid xs={12.4} md={12.6} lg={12.4}>
                  <Card
                    sx={{
                      p: 3,
                      width: 1,
                    }}
                    >
                    {cashRegisterForm}
                  </Card>
                </Grid>
                  <Grid xs={12.4} md={12.6} lg={12.4}>
                    <AppNewsUpdate
                      title="Panier du client 🛒"
                      list={[...Array(5)].map((_, index) => ({
                        id: faker.string.uuid(),
                        title: faker.person.jobTitle(),
                        description: faker.commerce.productDescription(),
                        image: `/assets/images/covers/cover_${index + 1}.jpg`,
                      }))}
                      />
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