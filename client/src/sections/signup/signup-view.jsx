import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { auth } from '../../Firebase';
import Iconify from '../../components/iconify';
import Logo from '../../components/logo';
import { bgGradient } from '../../theme/css';

const SignupView = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Account created successfully
        const user = userCredential.user;
        const uid = user.uid;

        // Create user in Firestore
        const displayName = `${firstName} ${lastName}`;

        return updateProfile(user, {
          displayName,
          role
        });
      })
      .then(() => {
        // Add user with admin role
        const userData = {
          admin: role === 'gerant',
        };

        return fetch('http://localhost:3001/api/newuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((errorMessage) => {
        // Handle signup errors
        switch (errorMessage.code) {
          case "auth/email-already-in-use":
            errorMessage = "Cette adresse e-mail est déjà utilisée. Veuillez utiliser une autre adresse e-mail.";
            break;
          case "auth/weak-password":
            errorMessage = "Le mot de passe est trop faible. Veuillez utiliser un mot de passe plus fort (minimum 6 caractères).";
            break;
          case "auth/invalid-email":
            errorMessage = "L'adresse e-mail saisie est invalide. Veuillez saisir une adresse e-mail valide.";
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
          name="firstName"
          label="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <TextField
          required
          name="lastName"
          label="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <TextField
          required
          name="email"
          label="Email"
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

        <Select
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
          label="Rôle"
        >
          <MenuItem value="gerant">Gérant</MenuItem>
          <MenuItem value="employe">Employé</MenuItem>
        </Select>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSignup}
        sx={{ mt: 4 }}
      >
        S&apos;enregistrer
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
          <Typography variant="h4">Créer un compte</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            Vous avez déjà un compte ?
            <Link href="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
              Se connecter
            </Link>
          </Typography>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
};

export default SignupView;
