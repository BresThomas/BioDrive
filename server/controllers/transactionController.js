import firebase from '../Firebase.js';
import Transaction from '../models/transactionModel.js';
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

// Créer une transaction
export const createTransaction = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'transactions'), data);
    res.status(200).send('Transaction créée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer toutes les transactions
export const getTransactions = async (req, res, next) => {
  try {
    const transactions = await getDocs(collection(db, 'transactions'));
    const transactionArray = [];

    if (transactions.empty) {
      res.status(400).send('Aucune transaction trouvée');
    } else {
      transactions.forEach((doc) => {
        const transaction = new Transaction(
          doc.id,
          doc.data().paiement,
          doc.data().carburant
        );
        transactionArray.push(transaction);
      });

      res.status(200).send(transactionArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer une transaction par son ID
export const getTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = doc(db, 'transactions', id);
    const data = await getDoc(transaction);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Transaction non trouvée');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour une transaction
export const updateTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const transaction = doc(db, 'transactions', id);
    await updateDoc(transaction, data);
    res.status(200).send('Transaction mise à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer une transaction
export const deleteTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'transactions', id));
    res.status(200).send('Transaction supprimée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
