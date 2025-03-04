const firebase = require('../Firebase.js');
const Pompe = require('../models/pompeModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer une pompe
exports.createPompe = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'pompes'), data);
    res.status(200).send('Pompe créée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer toutes les pompes
exports.getPompes = async (req, res, next) => {
  try {
    const pompes = await getDocs(collection(db, 'pompes'));
    const pompeArray = [];

    if (pompes.empty) {
      res.status(400).send('Aucune pompe trouvée');
    } else {
      pompes.forEach((doc) => {
        const pompe = new Pompe(
          doc.id,
          doc.data().carburants,
          doc.data().isRunning,
        );
        pompeArray.push(pompe);
      });

      res.status(200).send(pompeArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer une pompe par son ID
exports.getPompe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pompe = doc(db, 'pompes', id);
    const data = await getDoc(pompe);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Pompe non trouvée');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour une pompe
exports.updatePompe = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const pompe = doc(db, 'pompes', id);
    await updateDoc(pompe, data);
    res.status(200).send('Pompe mise à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer une pompe
exports.deletePompe = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'pompes', id));
    res.status(200).send('Pompe supprimée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
