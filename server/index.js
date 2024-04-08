const express = require('express');
const cors = require('cors');
const config = require('./config.js');
const productRoute = require('./routes/productRoute.js');
const transactionRoute = require('./routes/transactionRoute.js');
const carburantRoute = require('./routes/carburantRoute.js');
const tacheRoute = require('./routes/tacheRoute.js');
const pompeRoute = require('./routes/pompeRoute.js');
const paiementRoute = require('./routes/paiementRoute.js');
const employeRoute = require('./routes/employeRoute.js');
const avantageRoute = require('./routes/avantageRoute.js');
const clientRoute = require('./routes/clientRoute.js');
const compteEnergieRoute = require('./routes/compteEnergieRoute.js');
const incidentRoute = require('./routes/incidentRoute.js');
const stockRoute = require('./routes/stockRoute.js');
const reapproRoute = require('./routes/reapproRoute.js');
const horairesBoutiqueRoute = require('./routes/horairesBoutiqueRoute.js');
const table_TransactionsRoute = require('./routes/tableTransactionsRoute.js')
const table_IncidentsRoute = require('./routes/tableIncidentsRoute.js')
const carteEnergie = require('./routes/carteEnergieRoute.js')

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
app.use('/api', horairesBoutiqueRoute);
app.use('/api', table_TransactionsRoute);
app.use('/api', table_IncidentsRoute);
app.use('/api', carteEnergie);

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
