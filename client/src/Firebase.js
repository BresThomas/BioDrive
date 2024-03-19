import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAoj6DJPlXfQINVRtRHit98caypDf7CVcA",
  authDomain: "biodrive-d778e.firebaseapp.com",
  projectId: "biodrive-d778e",
  storageBucket: "biodrive-d778e.appspot.com",
  messagingSenderId: "278943019900",
  appId: "1:278943019900:web:29a52d33f7033025602af9",
  measurementId: "G-N7C8J34ZE4"
};

// Initialiser Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialiser l'authentification Firebase et obtenir une référence au service
export const auth = getAuth(firebaseApp);

export default firebaseApp;
