import express from 'express';
import cors from 'cors';

import config from './Config.js';
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

const app = express();

app.use(cors());
app.use(express.json());

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
