import firebase from '../Firebase.js';
import Carburant from '../models/carburantModel.js';
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

// Créer un carburant
export const createCarburant = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'carburants'), data);
    res.status(200).send('Carburant créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les carburants
export const getCarburants = async (req, res, next) => {
  try {
    const carburants = await getDocs(collection(db, 'carburants'));
    const carburantArray = [];

    if (carburants.empty) {
      res.status(400).send('Aucun carburant trouvé');
    } else {
      carburants.forEach((doc) => {
        const carburant = new Carburant(
          doc.id,
          doc.data().carburant,
          doc.data().prix,
          doc.data().stock_carburant
        );
        carburantArray.push(carburant);
      });

      res.status(200).send(carburantArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un carburant par son ID
export const getCarburant = async (req, res, next) => {
  try {
    const id = req.params.id;
    const carburant = doc(db, 'carburants', id);
    const data = await getDoc(carburant);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Carburant non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un carburant
export const updateCarburant = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const carburant = doc(db, 'carburants', id);
    await updateDoc(carburant, data);
    res.status(200).send('Carburant mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un carburant
export const deleteCarburant = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'carburants', id));
    res.status(200).send('Carburant supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
