import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importer PropTypes
import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../Firebase';


// Composant d'authentification
export default function AuthWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); // Obtenir la fonction de navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        // Set user state
        setCurrentUser(user);
        // Navigate to home or any other page after login
        navigate("/dashboard");
        console.log("uid", uid);
      } else {
        // User is signed out
        setCurrentUser(null);
        navigate("/login");
      }
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, [navigate]);

  // Attendre que l'état de l'utilisateur soit chargé avant de rendre les enfants
  if (currentUser === null) {
    return null;
  }

  // Rendre les enfants une fois que l'état de l'utilisateur est chargé
  return children;
}

// Validation des props avec PropTypes
AuthWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Valider que children est un noeud et qu'il est obligatoire
};
