const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'API endpoint is working!' });
});

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Expose Express app as a Cloud Function
exports.app = functions.https.onRequest(app);
