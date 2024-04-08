const firebase = require('../Firebase.js');
const CarteEnergie = require('../models/carteEnergieModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer un compte énergie
exports.createCarteEnergie = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'carteEnergie'), data);
    res.status(200).send('Carte énergie créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les comptes énergie
exports.getCarteEnergies = async (req, res, next) => {
  try {
    const carteEnergie = await getDocs(collection(db, 'carteEnergie'));
    const carteEnergieArray = [];

    if (carteEnergie.empty) {
      res.status(400).send('Aucune carte énergie trouvé');
    } else {
      carteEnergie.forEach((doc) => {
        const carteEnergie = new CarteEnergie(
          doc.id,
          doc.data().montantBonus,
          doc.data().tranchesBonus,
          doc.data().montantMin
        );
        carteEnergieArray.push(carteEnergie);
      });

      res.status(200).send(carteEnergieArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un compte énergie par son ID
exports.getCarteEnergie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carteEnergie = doc(db, 'carteEnergie', id);
    const data = await getDoc(carteEnergie);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Carte énergie non trouvée');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un compte énergie
exports.updateCarteEnergie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const carteEnergie = doc(db, 'carteEnergie', id);
    await updateDoc(carteEnergie, data);
    res.status(200).send('Carte énergie mise à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un compte énergie
exports.deleteCarteEnergie = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'carteEnergie', id));
    res.status(200).send('Carte énergie supprimée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
