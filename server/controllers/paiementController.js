import firebase from '../Firebase.js';
import Paiement from '../models/paiementModel.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

// Créer un paiement
export const createPaiement = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'paiements'), data);
    res.status(200).send('Paiement créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les paiements
export const getPaiements = async (req, res, next) => {
  try {
    const paiements = await getDocs(collection(db, 'paiements'));
    const paiementArray = [];

    if (paiements.empty) {
      res.status(400).send('Aucun paiement trouvé');
    } else {
      paiements.forEach((doc) => {
        const paiement = new Paiement(
          doc.id,
          doc.data().type,
          doc.data().somme
        );
        paiementArray.push(paiement);
      });

      res.status(200).send(paiementArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un paiement par son ID
export const getPaiement = async (req, res, next) => {
  try {
    const id = req.params.id;
    const paiement = doc(db, 'paiements', id);
    const data = await getDoc(paiement);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Paiement non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un paiement
export const updatePaiement = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const paiement = doc(db, 'paiements', id);
    await updateDoc(paiement, data);
    res.status(200).send('Paiement mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un paiement
export const deletePaiement = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'paiements', id));
    res.status(200).send('Paiement supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
