import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import Iconify from '../../components/iconify';

import queryApi from '../../utils/query';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    checkCredentials();
  };

  const checkCredentials = async () => {

    firebase.ref('')
    const userId = document.getElementsByName('userId')[0].value;
    const password = document.getElementsByName('password')[0].value;

    const data = await queryApi();

    if(data.id === userId && data.password === password) {
      router.push('/dashboard');
    } else {
      alert('Identifiant ou mot de passe incorrect');
    } 


  }

  const renderForm = (
    <>
      <Stack spacing={3} >
        <TextField name="userId" label="Identifiant" />

        <TextField
          name="password"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Mot de passe oublié?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Se connecter
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Connexion à EcoDrive</Typography>
            <Divider sx={{ my: 3 }} />
          
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
