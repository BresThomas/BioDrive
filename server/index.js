import express from 'express';
import cors from 'cors';
import config from './config.js';
import productRoute from './routes/productRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import carburantRoute from './routes/carburantRoute.js';
import tacheRoute from './routes/tacheRoute.js';
import pompeRoute from './routes/pompeRoute.js';
import paiementRoute from './routes/paiementRoute.js';
import employeRoute from './routes/employeRoute.js';
import avantageRoute from './routes/avantageRoute.js';
import clientRoute from './routes/clientRoute.js';
import compteEnergieRoute from './routes/compteEnergieRoute.js';
import incidentRoute from './routes/incidentRoute.js';
import stockRoute from './routes/stockRoute.js';
import reapproRoute from './routes/reapproRoute.js';

import { auth } from './Firebase.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const requireAuth = (req, res, next) => {
  if (req.user) {
    // Si l'utilisateur est authentifié, continuez
    next();
  } else {
    // Sinon, redirigez l'utilisateur vers la page de connexion
    res.redirect('http://localhost:3000/login');
  }
};

const app = express();

app.use(cors());
app.use(express.json());

app.get('/dashboard', requireAuth, (req, res) => {
  // Code pour la page de tableau de bord accessible uniquement aux utilisateurs authentifiés
  res.redirect('http://localhost:3000/dashboard');
});


app.use('/api', productRoute);
app.use('/api', transactionRoute);
app.use('/api', carburantRoute);
app.use('/api', tacheRoute);
app.use('/api', pompeRoute);
app.use('/api', paiementRoute);
app.use('/api', employeRoute);
app.use('/api', avantageRoute);
app.use('/api', clientRoute);
app.use('/api', compteEnergieRoute);
app.use('/api', incidentRoute);
app.use('/api', stockRoute);
app.use('/api', reapproRoute);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);


// Endpoint pour la connexion
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const userRecord = await signInWithEmailAndPassword(auth, email, password);
    res.status(200).json({ message: 'User logged in successfully', data: userRecord });
    console.log(userRecord);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint pour la déconnexion
app.post('/api/logout', async (req, res) => {
  try {
    await signOut();
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
