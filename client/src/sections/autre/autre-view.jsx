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
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


import { posts } from '../../_mock/blog';
import PostSearch from '../blog/post-search';
import { RouterLink } from '../../routes/components';
import AppNewsUpdate from '../overview/app-news-update';
import AppLeftShort from '../overview/app-left-short';
import { usePathname, useRouter } from '../../routes/hooks';
import Header from '../../layouts/dashboard/header';
import navConfig from "../../layouts/dashboard/config-navigation";


// ----------------------------------------------------------------------

const filtreRecherche = ['Tous', 'Nom du produit', 'Identifiant', 'Catégorie'];

export default function DashboardView() {
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V']; 

  const [enteredValue, setEnteredValue] = useState('');

  const handleValueChange = (newValue) => {
    setEnteredValue(newValue);
  };

    const theme = useTheme();
    const router = useRouter();

    const [taches, setTaches] = useState([]);

    useEffect(() => {
      getTaches();
    }, []);
  
    const getTaches = async () => {
      await fetch('http://localhost:3001/api/taches')
          .then(response => {
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
          })
          .then(data => {
            setTaches(data);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des données:", error);
          });
    };

    const handleDeleteTache = async (id) => {
      try {
        const response = await fetch(`http://localhost:3001/api/deleteTache/${id} `, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour des données');
        }
        console.log('Données mises à jour avec succès');
        getTaches();
        // window.location.reload(true);
      } catch (error) {
        console.error(error.message);
      }
    };

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

    const [pompes, setPompe] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/pompes")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Erreur lors de la récupération des données"
                    );
                }
                return response.json();
            })
            .then((data) => {
                setPompe(data);
            })
            .catch((error) => {
                console.error(
                    "Erreur lors de la récupération des données:",
                    error
                );
            });
    }, []);

    const handleClick = () => {
      router.push('/dashboard');
    };

    const [paymentMode, setPaymentMode] = useState('');

    const ajouterService = (title) => (
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6" sx={{ width: '10%' }}>{title}</Typography>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ width: '80%' }}>
          <TextField name="nom" label="nom" sx={{ width: '16%' }}/>
          <TextField name="type" label="type" sx={{ width: '16%' }}/>
          <TextField name="mail" label="email" sx={{ width: '17%' }}/>
          <TextField name="tel" label="téléphone" sx={{ width: '16%' }}/>
          <TextField name="adresse" label="adresse" sx={{ width: '16%' }}/>
          <TextField name="iban" label="iban" sx={{ width: '17%' }}/>

        </Stack>
        <LoadingButton
          sx={{ width: '10%' }}
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

    const [clients, setClient] = useState([]);

    useEffect(() => {
      fetch('http://localhost:3001/api/clients')
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
          return response.json();
        })
        .then(data => {
          setClient(data);
        })
        .catch(error => {
          console.error("Erreur lors de la récupération des données:", error);
        });
    }, []);  

    // ==================== CHANGEMENT PRIX CREDIT ENERGIE ==========================//

    const [carteEnergies, setCarteEnergie] = useState([]);

        useEffect(() => {
          fetch('http://localhost:3001/api/carteEnergie/donneCarteEnergie')
            .then(response => {
              if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
              }
              return response.json();
            })
            .then(data => {
              setCarteEnergie(data);
            })
            .catch(error => {
              console.error("Erreur lors de la récupération des données:", error);
            });
        }, []);

    const initialFormCarteEnergie = {
      montantBonus: '',
      tranchesBonus: '',
      montantMin: '',
    };
  
    const [formCarteEnergie, setFormCarteEnergie] = useState(initialFormCarteEnergie);

    const handleChangeCarteEnergie = (event) => {
      const { name, value } = event.target;
      setFormCarteEnergie(prevFormCarteEnergie => ({
        ...prevFormCarteEnergie,
        [name]: value
      }));

      console.log(formCarteEnergie);

    };

    const clickFormCarteEnergie = async () => {
      console.log(formCarteEnergie);

      const response = await fetch('http://localhost:3001/api/updateCarteEnergie/donneCarteEnergie', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          montantBonus : parseInt(formCarteEnergie.montantBonus, 10),
          tranchesBonus : parseInt(formCarteEnergie.tranchesBonus, 10),
          montantMin : parseInt(formCarteEnergie.montantMin, 10)
        })
      });

      if (response.ok) {
        // Réinitialiser les champs du formulaire à leur valeur initiale vide
        setFormCarteEnergie(initialFormCarteEnergie);
        console.log("Formulaire soumis avec succès!");
        window.location.reload(true);
      } else {
        console.error("Erreur lors de la soumission du formulaire");
      }
    };

    const renderFormCreditEnergie = (
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h6">Carte Crédit Energie</Typography>
    
        <Stack spacing={3} direction="row" alignItems="center">
          
          <Typography variant="h8">Montant Bonus : </Typography>
          <TextField name="montantBonus" value={formCarteEnergie.montantBonus} label={`${carteEnergies.montantBonus}%`} onChange={handleChangeCarteEnergie}/>
          <Typography variant="h8">Tranches Bonus : </Typography>
          <TextField name="tranchesBonus" value={formCarteEnergie.tranchesBonus} label={`${carteEnergies.tranchesBonus}%`} onChange={handleChangeCarteEnergie}/>
          <Typography variant="h8">Montant Min : </Typography>
          <TextField name="montantMin" value={formCarteEnergie.montantMin} label={`${carteEnergies.montantMin}€`} onChange={handleChangeCarteEnergie}/>
        </Stack>
    
        <LoadingButton
          sx={{ width: '10%' }}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={clickFormCarteEnergie}
        >
          Valider
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
        <AppNewsUpdate
                title="Liste Clients"
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  image: `/assets/images/covers/cover_${index + 1}.jpg`,
                  postedAt: faker.date.recent(),
                }))}
              />
    );  

  return (
    <Container maxWidth="xxl">
      <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={5} xl={5}>
                <Typography variant="h4" sx={{ mb: 2, mt: 5 }}>
                Autre
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
                  <Card sx={{ p: 3, width: 1,}}>
                      {listStock}
                    </Card>
                  </Grid>
                  <Grid container spacing={19}> 
                  <Grid xs={6} md={6} lg={5}>
                  <Card 
                          sx={{width: 375, height: 275, overflowY: 'auto',}}>
                              <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
                                <CardHeader title="Planning 📅"/>
                              </Stack>
                              <Stack spacing={1} sx={{ p: 1, pr: 0 }}>
                              <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 310, maxWidth:310, margin: 2 }} aria-label="simple table">
                                  <TableBody>
                                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                                      <TableRow key={rowIndex}>
                                        {Array.from({ length: 5 }).map((__, colIndex) => (
                                          <TableCell key={colIndex} align="center" variant="head" style={{ border: '1px solid black' }}>
                                            <Typography>
                                              {rowIndex === 0 ? daysOfWeek[colIndex] : ' '}
                                            </Typography>
                                          </TableCell>
                                        ))}
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                              </Stack>
                          </Card>
                      
                    
                  </Grid>
                  <Grid xs={10} md={6} lg={5}>
                      <AppLeftShort
                        sx={{ width: 800, height: 150, overflowY: 'auto'}}                        
                        title="Tâches 📝"
                        list={taches.slice(0,5).map(tache => ({
                          title: tache.libelle,
                          description: tache.assigne,
                          image: `/assets/icons/glass/ic_glass_message.png`,
                          postedAt: tache.dateButoire,
                          button1: <Button style={{ backgroundColor: 'black',color: 'white' }} onClick={() => handleDeleteTache(tache.id_tache)} >Supprimer</Button>,
                        }))}
                      />
                  </Grid>
                </Grid>
                  </Stack>    
                </Grid>  
              </Grid>
            </Grid>
        <Grid item xs={36} sm={12} md={7} xl={7}>
          <Box sx={{ pb: 10 }}>
              <Header />
          </Box>
          <Stack direction="row" spacing={2} sx={{ p: 2 }}>
              {navConfig.map((item) => (
                  <NavItem key={item.title} item={item} />
              ))}
          </Stack>
          <Stack direction="row" spacing={35}>
            <Grid xs={12} sm={6} md={3}>
                {listClient}
            </Grid>   
            <Grid xs={12} sm={6} md={3}>
            <AppNewsUpdate
                                        sx={{
                                            width: 520,
                                            height: 200,
                                            overflowY: "auto",
                                        }}
                                        title="Pompes ⛽"
                                        path="/pompes"
                                        list={pompes
                                            .slice(0, 5)
                                            .map((pompe) => ({
                                                id: pompe.id_pompe,
                                                title: `ID pompe : ${pompe.id_pompe}`,
                                                description: `Carburants : ${Array.isArray(pompe.carburants) ? pompe.carburants.join(", ") : ""}`,
                                                isRunning: `${pompe.isRunning}`,
                                                image: `/assets/icons/borne.png`,
                                                postedAt: "02/03/2023",
                                            }))}
                                    />
            </Grid>      
          </Stack>
          <Grid xs={12} sm={6} md={3} pt={3}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card sx={{p: 2, width: 1,}}>
                {renderFormCreditEnergie}
              </Card>
            </Stack>
          </Grid>
          <Grid xs={12} sm={6} md={3} pt={3} spacing={2} sx={{ marginBottom: 3 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
              <Card sx={{p: 2, width: 1,}}>
                {ajouterService('Ajouter Service 🛠️')}
              </Card>
            </Stack>
          </Grid>

          <Grid container spacing={2}>
            <Grid xs={12} md={6} lg={4}>
              <AppNewsUpdate sx={{ width: 520, height: 140, overflowY: 'auto' }}
                title="Parkings disponibles 🚗"
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
                  sx={{ width: 520, height: 140, overflowY: 'auto' }}
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
              <AppNewsUpdate sx={{ width: 520, height: 140, overflowY: 'auto' }}
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
                sx={{ width: 520, height: 140, overflowX: 'auto', overflowY: 'none',
                  display: 'flex', flexDirection: 'row' }}
                list={[...Array(5)].map((_, index) => ({
                  id: faker.string.uuid(),
                  title: faker.person.jobTitle(),
                  description: faker.commerce.productDescription(),
                  postedAt: faker.date.recent(),
                }))}
              />
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