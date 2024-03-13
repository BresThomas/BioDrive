import express from 'express';
import cors from 'cors';

import config from './Config.js';
import productRoute from './routes/productRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api', productRoute);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);


