const firebase = require('../Firebase.js');
const Client = require('../models/clientModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer un client
exports.createClient = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'clients'), data);
    res.status(200).send('Client créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les clients
exports.getClients = async (req, res, next) => {
  try {
    const clients = await getDocs(collection(db, 'clients'));
    const clientArray = [];

    if (clients.empty) {
      res.status(400).send('Aucun client trouvé');
    } else {
      clients.forEach((doc) => {
        const client = new Client(
          doc.id,
          doc.data().email,
          doc.data().nom,
          doc.data().prenom,
          doc.data().adresse,
          doc.data().date_naissance,
          doc.data().numero_portable,
          doc.data().id_compte_energie,
          doc.data().historique_transactions,
        );
        clientArray.push(client);
      });

      res.status(200).send(clientArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un client par son ID
exports.getClient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const client = doc(db, 'clients', id);
    const data = await getDoc(client);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Client non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un client
exports.updateClient = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const client = doc(db, 'clients', id);
    await updateDoc(client, data);
    res.status(200).send('Client mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un client
exports.deleteClient = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'clients', id));
    res.status(200).send('Client supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
