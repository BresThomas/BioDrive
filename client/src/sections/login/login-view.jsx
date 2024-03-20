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
import axios from 'axios'; // Importez axios pour effectuer des requêtes HTTP

import { useRouter } from '../../routes/hooks';
import { bgGradient } from '../../theme/css';
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        email,
        password
      });
      console.log(response.data); // Gérer la réponse du serveur
      router.push('/dashboard'); // Redirection vers la page de tableau de bord
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      // Gérer les erreurs de connexion (par exemple, afficher un message d'erreur à l'utilisateur)
    } finally {
      setLoading(false);
    }
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
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Mot de passe"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        onClick={handleLogin}
        loading={loading}
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
