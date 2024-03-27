import firebase from '../Firebase.js';
import Stock from '../models/stockModel.js';
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

// Créer un stock
export const createStock = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'stocks'), data);
    res.status(200).send('Stock créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les stocks
export const getStocks = async (req, res, next) => {
  try {
    const stocks = await getDocs(collection(db, 'stocks'));
    const stockArray = [];

    if (stocks.empty) {
      res.status(400).send('Aucun stock trouvé');
    } else {
      stocks.forEach((doc) => {
        const stock = new Stock(
          doc.id,
          doc.data().details
        );
        stockArray.push(stock);
      });

      res.status(200).send(stockArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un stock par son ID
export const getStock = async (req, res, next) => {
  try {
    const id = req.params.id;
    const stock = doc(db, 'stocks', id);
    const data = await getDoc(stock);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Stock non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un stock
export const updateStock = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const stock = doc(db, 'stocks', id);
    await updateDoc(stock, data);
    res.status(200).send('Stock mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un stock
export const deleteStock = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'stocks', id));
    res.status(200).send('Stock supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
