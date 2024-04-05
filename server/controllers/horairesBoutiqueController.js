const firebase = require('../Firebase.js');
const HoraireBoutique = require('../models/horairesBoutiqueModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer une horairesBoutique
exports.createHorairesBoutique = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'horairesBoutique'), data);
    res.status(200).send('horairesBoutique créée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer toutes les horairesBoutique
exports.getHorairesBoutiques = async (req, res, next) => {
  try {
    const horairesBoutique = await getDocs(collection(db, 'horairesBoutique'));
    const horairesBoutiqueArray = [];

    if (horairesBoutique.empty) {
      res.status(400).send('Aucune horairesBoutique trouvée');
    } else {
      horairesBoutique.forEach((doc) => {
        const horairesBoutique = new HoraireBoutique(
          doc.id,
          doc.data().horaireDebut,
          doc.data().horaireFin
        );
        horairesBoutiqueArray.push(horairesBoutique);
      });

      res.status(200).send(horairesBoutiqueArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer une horairesBoutique par son ID
exports.getHorairesBoutique = async (req, res, next) => {
  try {
    const id = req.params.id;
    const horairesBoutique = doc(db, 'horairesBoutique', id);
    const data = await getDoc(horairesBoutique);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('horairesBoutique non trouvée');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour une horairesBoutique
exports.updateHorairesBoutique = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const horairesBoutique = doc(db, 'horairesBoutique', id);
    await updateDoc(horairesBoutique, data);
    res.status(200).send('horairesBoutique mise à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer une horairesBoutique
exports.deleteHorairesBoutique = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'horairesBoutique', id));
    res.status(200).send('horairesBoutique supprimée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
