const firebase = require('../Firebase.js');
const Employe = require('../models/employeModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer un employé
const createEmploye = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'employes'), data);
    res.status(200).send('Employé créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les employés
const getEmployes = async (req, res, next) => {
  try {
    const employes = await getDocs(collection(db, 'employes'));
    const employeArray = [];

    if (employes.empty) {
      res.status(400).send('Aucun employé trouvé');
    } else {
      employes.forEach((doc) => {
        const employe = new Employe(
          doc.id,
          doc.data().nom,
          doc.data().prenom,
          doc.data().id_tache
        );
        employeArray.push(employe);
      });

      res.status(200).send(employeArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un employé par son ID
const getEmploye = async (req, res, next) => {
  try {
    const id = req.params.id;
    const employe = doc(db, 'employes', id);
    const data = await getDoc(employe);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Employé non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un employé
const updateEmploye = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const employe = doc(db, 'employes', id);
    await updateDoc(employe, data);
    res.status(200).send('Employé mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un employé
const deleteEmploye = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'employes', id));
    res.status(200).send('Employé supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { createEmploye, getEmployes, getEmploye, updateEmploye, deleteEmploye };
