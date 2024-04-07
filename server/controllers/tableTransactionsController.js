const firebase = require('../Firebase.js');
const TableTransactions = require('../models/tableTransactionsModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer une table de transactions
exports.createTableTransactions = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'table_transactions'), data);
    res.status(200).send('Table de transactions créée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer toutes les tables de transactions
exports.getTableTransactions = async (req, res, next) => {
  try {
    const tablesTransactions = await getDocs(collection(db, 'table_transactions'));
    const tableTransactionsArray = [];

    if (tablesTransactions.empty) {
      res.status(400).send('Aucune table de transaction trouvée');
    } else {
      tablesTransactions.forEach((doc) => {
        const tableTransactions = new TableTransactions(
          doc.id,
          doc.data().id_transactions
        );
        tableTransactionsArray.push(tableTransactions);
      });

      res.status(200).send(tableTransactionsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer une table de transaction par son ID
exports.getTableTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tableTransaction = doc(db, 'table_transactions', id);
    const data = await getDoc(tableTransaction);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Table de transaction non trouvée');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour une table de transaction
exports.updateTableTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const tableTransaction = doc(db, 'table_transactions', id);
    await updateDoc(tableTransaction, data);
    res.status(200).send('Table de transaction mise à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer une table de transaction
exports.deleteTableTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'table_transactions', id));
    res.status(200).send('Table de transaction supprimée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
