import firebase from '../Firebase.js';
import CompteEnergie from '../models/compteEnergieModel.js';
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

// Créer un compte énergie
export const createCompteEnergie = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'comptesEnergie'), data);
    res.status(200).send('Compte énergie créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les comptes énergie
export const getComptesEnergie = async (req, res, next) => {
  try {
    const comptesEnergie = await getDocs(collection(db, 'comptesEnergie'));
    const compteEnergieArray = [];

    if (comptesEnergie.empty) {
      res.status(400).send('Aucun compte énergie trouvé');
    } else {
      comptesEnergie.forEach((doc) => {
        const compteEnergie = new CompteEnergie(
          doc.id,
          doc.data().solde,
          doc.data().transactions,
          doc.data().id_avantage
        );
        compteEnergieArray.push(compteEnergie);
      });

      res.status(200).send(compteEnergieArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un compte énergie par son ID
export const getCompteEnergie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const compteEnergie = doc(db, 'comptesEnergie', id);
    const data = await getDoc(compteEnergie);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Compte énergie non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un compte énergie
export const updateCompteEnergie = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const compteEnergie = doc(db, 'comptesEnergie', id);
    await updateDoc(compteEnergie, data);
    res.status(200).send('Compte énergie mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un compte énergie
export const deleteCompteEnergie = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'comptesEnergie', id));
    res.status(200).send('Compte énergie supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
