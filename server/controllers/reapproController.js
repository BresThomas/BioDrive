const firebase = require('../Firebase.js');
const Reappro = require('../models/reapproModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer un réapprovisionnement
exports.createReappro = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'reappros'), data);
    res.status(200).send('Réapprovisionnement créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les réapprovisionnements
exports.getReappros = async (req, res, next) => {
  try {
    const reappros = await getDocs(collection(db, 'reappros'));
    const reapproArray = [];

    if (reappros.empty) {
      res.status(400).send('Aucun réapprovisionnement trouvé');
    } else {
      reappros.forEach((doc) => {
        const reappro = new Reappro(
          doc.id,
          doc.data().noms,
          doc.data().date_debut,
          doc.data().date_fin
        );
        reapproArray.push(reappro);
      });

      res.status(200).send(reapproArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un réapprovisionnement par son ID
exports.getReappro = async (req, res, next) => {
  try {
    const id = req.params.id;
    const reappro = doc(db, 'reappros', id);
    const data = await getDoc(reappro);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Réapprovisionnement non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un réapprovisionnement
exports.updateReappro = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const reappro = doc(db, 'reappros', id);
    await updateDoc(reappro, data);
    res.status(200).send('Réapprovisionnement mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un réapprovisionnement
exports.deleteReappro = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'reappros', id));
    res.status(200).send('Réapprovisionnement supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
