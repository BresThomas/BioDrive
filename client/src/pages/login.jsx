import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
import { LoginView } from '../sections/login';
import { DashboardView } from '../sections/dashboard';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const [user, setUser] = useState(null); // Utiliser un état pour suivre l'état de l'utilisateur

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser); // Mettre à jour l'état de l'utilisateur lorsqu'il change
    });

    return () => unsubscribe(); // Nettoyer la fonction de rappel pour se désinscrire du listener
  }, []);

  // Si l'utilisateur est déjà connecté, rediriger vers la page du tableau de bord
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <Helmet>
        <title>Login | Minimal UI</title>
      </Helmet>

      <LoginView />
    </>
  );
}
