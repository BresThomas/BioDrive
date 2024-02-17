import { useState, useEffect} from 'react';
import { faker } from '@faker-js/faker';
import Grid from '@mui/material/Unstable_Grid2';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Iconify from '../../components/iconify';
import { useRouter } from '../../routes/hooks';



import { RouterLink } from '../../routes/components';

import Logo from '../../components/logo';

import AppOrderTimeline from '../overview/app-order-timeline';

// ----------------------------------------------------------------------

export default function TransactionsView() {

  const [hello, setHello] = useState("");
   
    useEffect(() => {
      fetch('http://localhost:3001/api')
        .then((response) => response.json())
        .then((data) => setHello(data.message));
    }, []);

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const renderHeader = (
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
  );

  

  const renderForm = (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={15} md={10}>
        <TextField fullWidth name="email" label="Email address" />
        <TextField fullWidth name="email" label="Email address" />
        <TextField fullWidth name="email" label="Email address" />
        <TextField fullWidth name="email" label="Email address" />
        <Button href="/" size="large" variant="contained" component={RouterLink}>
            Clear
        </Button>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleClick}
        >
          Submit
        </LoadingButton>
      </Grid>
    </Grid>
  );

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Dashboard transactions
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
          {hello}
          </Typography>

          <Grid xs={12} md={6} lg={8}>
          <AppOrderTimeline
            title="Transactions passées"
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

          <Button href="/" size="large" variant="contained" component={RouterLink}>
            Go to Home
          </Button>
        </Box>
      </Container>

      {renderForm}

  
    </>
  );
}
