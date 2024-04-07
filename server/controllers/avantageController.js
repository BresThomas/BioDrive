const firebase = require('../Firebase.js');
const Avantage = require('../models/avantageModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer un avantage
exports.createAvantage = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'avantages'), data);
    res.status(200).send('Avantage créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les avantages
exports.getAvantages = async (req, res, next) => {
  try {
    const avantages = await getDocs(collection(db, 'avantages'));
    const avantageArray = [];

    if (avantages.empty) {
      res.status(400).send('Aucun avantage trouvé');
    } else {
      avantages.forEach((doc) => {
        const avantage = new Avantage(
          doc.id,
          doc.data().montant_bonus,
          doc.data().tranches_bonus,
          doc.data().montant_minimum
        );
        avantageArray.push(avantage);
      });

      res.status(200).send(avantageArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un avantage par son ID
exports.getAvantage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const avantage = doc(db, 'avantages', id);
    const data = await getDoc(avantage);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Avantage non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un avantage
exports.updateAvantage = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const avantage = doc(db, 'avantages', id);
    await updateDoc(avantage, data);
    res.status(200).send('Avantage mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un avantage
exports.deleteAvantage = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'avantages', id));
    res.status(200).send('Avantage supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
