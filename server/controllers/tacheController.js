const firebase = require('../Firebase.js');
const Tache = require('../models/tacheModel.js');
const {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer une tâche
exports.createTache = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'taches'), data);
    res.status(200).send('Tâche créée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer toutes les tâches
exports.getTaches = async (req, res, next) => {
  try {
    const taches = await getDocs(collection(db, 'taches'));
    const tacheArray = [];

    if (taches.empty) {
      res.status(400).send('Aucune tâche trouvée');
    } else {
      taches.forEach((doc) => {
        const tache = new Tache(
          doc.id,
          doc.data().assigne,
          doc.data().dateButoire,
          doc.data().libelle
        );
        tacheArray.push(tache);
      });

      res.status(200).send(tacheArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer une tâche par son ID
exports.getTache = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tache = doc(db, 'taches', id);
    const data = await getDoc(tache);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Tâche non trouvée');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour une tâche
exports.updateTache = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const tache = doc(db, 'taches', id);
    await updateDoc(tache, data);
    res.status(200).send('Tâche mise à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer une tâche
exports.deleteTache = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'taches', id));
    res.status(200).send('Tâche supprimée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
