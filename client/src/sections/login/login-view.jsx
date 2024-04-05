import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton'; // Import from correct path
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { auth } from '../../Firebase';
import Iconify from '../../components/iconify';
import Logo from '../../components/logo';
import { bgGradient } from '../../theme/css';

const LoginView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard");
      })
      .catch((errorMessage) => {
        // Handle login errors
        // Traduire l'erreur en un message convivial pour l'utilisateur
        switch (errorMessage.code) {
          case "auth/user-not-found":
            errorMessage = "Aucun compte trouvé avec cette adresse e-mail. Veuillez vous inscrire d'abord.";
            break;
          case "auth/wrong-password":
            errorMessage = "Le mot de passe saisi est incorrect. Veuillez réessayer.";
            break;
          case "auth/invalid-email":
            errorMessage = "L'email est invalide. Veuillez réessayer.";
            break;
          case "auth/invalid-credential":
            errorMessage = "L'email ou le mot de passe fourni est incorrect. Veuillez vérifier les informations que vous avez saisies pour vous connecter.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Accès à ce compte temporairement désactivé en raison de trop de tentatives de connexion échouées. Réessayer ultérieurement.";
            break;
          // Ajoutez d'autres cas pour d'autres erreurs Firebase courantes ici
          default:
            break;
        }
  
        // Mettre à jour le state avec le message d'erreur convivial
        setError(errorMessage);
      });
  };
  

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          required 
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          required 
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
      >
        Se connecter
      </LoadingButton>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error.toString()}
        </Typography>
      )}
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
          <Typography variant="h4">Sign in to ERP 👋</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Don’t have an account?
            <Link href="/signup" variant="subtitle2" sx={{ ml: 0.5 }}>
              Get started
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
};

export default LoginView;
