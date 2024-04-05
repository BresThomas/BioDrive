const firebase = require('../Firebase.js');
const TableIncidents = require('../models/tableIncidentsModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer une table d'incidents
exports.createTableIncidents = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'table_incidents'), data);
    res.status(200).send('Table d\'incidents créée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer toutes les tables d'incidents
exports.getTableIncidents = async (req, res, next) => {
  try {
    const tablesIncidents = await getDocs(collection(db, 'table_incidents'));
    const tableIncidentsArray = [];

    if (tablesIncidents.empty) {
      res.status(400).send('Aucune table d\'incident trouvée');
    } else {
      tablesIncidents.forEach((doc) => {
        const tableIncidents = new TableIncidents(
          doc.id,
          doc.data().id_incidents
        );
        tableIncidentsArray.push(tableIncidents);
      });

      res.status(200).send(tableIncidentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer une table d'incident par son ID
exports.getTableIncident = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tableIncident = doc(db, 'table_incidents', id);
    const data = await getDoc(tableIncident);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Table d\'incident non trouvée');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour une table d'incident
exports.updateTableIncident = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const tableIncident = doc(db, 'table_incidents', id);
    await updateDoc(tableIncident, data);
    res.status(200).send('Table d\'incident mise à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer une table d'incident
exports.deleteTableIncident = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'table_incidents', id));
    res.status(200).send('Table d\'incident supprimée avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
