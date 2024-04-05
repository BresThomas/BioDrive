import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
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
export default function ServicesAndLogistiqueView() {
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

    // ==================DEMANDE DE REAPPRO================ //

    const initialFormDataReappro = {
      id_produit: '',
      quantite: '',
      adresse_livraison: '',
      date_livraison: '',
      prix: '',
    };
  
    const [formDataReappro, setFormDataReappro] = useState(initialFormDataReappro);
  
    const handleChangeReappro = (event) => {
      const { name, value } = event.target;
      setFormDataReappro(prevFormDataReappro => ({
        ...prevFormDataReappro,
        [name]: value
      }));
    };

    const handleChangeSearchReappro = (event, value) => { // Recupere specifiquement l'id dans la list posts
      // const { name, value } = event.target;
      setFormDataReappro(prevFormDataReappro => ({
        ...prevFormDataReappro,
        id_produit: value.id
      }));
    };

    const clickFormReappro = async () => {
      console.log("vababab");
      console.log(formDataReappro);
  
      const response = await fetch('http://localhost:3001/api/newReappro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

          id_produit: formDataReappro.id_produit,
          quantite: formDataReappro.quantite,
          adresse_livraison: formDataReappro.adresse_livraison,
          date_livraison: formDataReappro.date_livraison,
          prix: formDataReappro.prix,
        })
      });

      if (response.ok) {
        // Réinitialiser les champs du formulaire à leur valeur initiale vide
        setFormDataReappro(initialFormDataReappro);
        console.log("Formulaire soumis avec succès!");
        // window.location.reload(true);
      } else {
        console.error("Erreur lors de la soumission du formulaire");
      }
    };
    
    

    const renderForm = (
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6">Demande de réappro</Typography>
    
        <Stack spacing={3} direction="row" alignItems="center">
          
          <PostSearch posts={posts} onChange={handleChangeSearchReappro}/>
          <TextField name="quantite" label="Quantité" onChange={handleChangeReappro} />
          <TextField name="adresse_livraison" label="Adresse livraison" onChange={handleChangeReappro} />
          <TextField name="date_livraison" label="Date livraison" onChange={handleChangeReappro} />
          <TextField name="prix" label="Prix" onChange={handleChangeReappro} />
        </Stack>
    
        <LoadingButton
          sx={{ width: '22.5%' }}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={clickFormReappro}
        >
          Submit
        </LoadingButton>
      </Stack>
    );    

    const renderForm2 = (
      <Stack spacing={30} direction="row" alignItems="center" sx={{ width: '1000px'}}>
    <Typography variant="h6" sx={{ fontSize: '1.5rem', width: '50%' }}>Tickets de transport en commun</Typography>
    <Typography variant="h6" sx={{ fontSize: '1.5rem', width: '50%' }}>Nombre restant :  XX</Typography> 
        

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

    const renderForm3 = (
      <Stack spacing={30} direction="row" alignItems="center" sx={{ width: '1000px'}}>
      <Typography variant="h6" sx={{ fontSize: '1.5rem', width: '50%' }}>Abonnement  aux transport en commun</Typography>
        

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

    const renderForm4 = (
      <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '1000px'}}>
        <Typography variant="h6" sx={{ fontSize: '1.5rem', width: '50%' }}>Réserver un service entre perticulier</Typography>
    
        <Stack spacing={3} direction="row" alignItems="center">
          
          <PostSearch posts={posts} />
          <TextField name="email" label="EMail du client" />
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
        <Typography variant="h6">{products.map((product, index) => (
          <div key={index}>
            <p>{product.price}€</p>
          </div>
        ))}
      
      </Typography>
          
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
                        // list={products.map((product, index) => ({
                        //       id: product.id || `Product${index + 1}`, // Utilisez un ID par défaut si l'ID n'est pas disponible
                        //       title: product.name || `Product ${index + 1}`, // Utilisez un nom de produit par défaut si le nom n'est pas disponible
                        //       price: product.price || 0, // Utilisez un prix par défaut si le prix n'est pas disponible
                        //     }))}
                        />
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


        <Grid container spacing={3}>

          <Grid xs={12} sm={6} md={3}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card
                sx={{
                  p: 3,
                  width: 1,
                }}
              >
                {renderForm2}
              </Card>
            </Stack>
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card
                sx={{
                  p: 3,
                  width: 1,
                }}
              >
                {renderForm3}
              </Card>
            </Stack>
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            
            <Grid container spacing={3} >
              <Grid xs={12} sm={6} md={3}>
              <AppNewsUpdate sx={{ width: 520, height: 180, overflowY: 'auto' }}
                title="Parkings disponibles"
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
              <AppNewsUpdate sx={{ width: 520, height: 180, overflowY: 'auto' }}
                title="Services de livraison spéciaux"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
            </Grid>

            <Grid xs={12} sm={6} md={6}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1}}>
              <Card
                sx={{
                  p: 3,
                  width: 1,
                }}
              >
                {renderForm4}
              </Card>
            </Stack>
          </Grid>

          <Grid xs={15} sm={6} md={3}>
              <AppNewsUpdate sx={{ width: 520, height: 280, overflowY: 'auto' }}
                title="Consulter les plannings"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
              </Grid>
              
            <Grid xs={15} sm={6} md={3}>
              <AppNewsUpdate sx={{ width: 520, height: 280, overflowY: 'auto' }}
                title="Consulter les tables de transaction"
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