// Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from './config.js';

// Initialisez l'application Firebase avec la configuration
const firebase = initializeApp(config.firebaseConfig);

// Initialisez l'authentification Firebase avec l'application Firebase
const auth = getAuth(firebase);

export { auth }; // Exportez auth

export default firebase; // Exportez l'application Firebase
