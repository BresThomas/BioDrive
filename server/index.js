import express from 'express';
import cors from 'cors';

import config from './Config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);
