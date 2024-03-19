import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importer PropTypes
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';

// Composant d'authentification
export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Obtenir la fonction de navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Attendre que l'état de l'utilisateur soit chargé avant de rendre les enfants
  if (user === null) {
    return null;
  }

  // Rendre les enfants une fois que l'état de l'utilisateur est chargé
  return children;
}

// Validation des props avec PropTypes
AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Valider que children est un noeud et qu'il est obligatoire
};
