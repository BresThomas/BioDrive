import firebase from '../Firebase.js';
import Incident from '../models/incidentModel.js';
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

// Créer un incident
export const createIncident = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'incidents'), data);
    res.status(200).send('Incident créé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer tous les incidents
export const getIncidents = async (req, res, next) => {
  try {
    const incidents = await getDocs(collection(db, 'incidents'));
    const incidentArray = [];

    if (incidents.empty) {
      res.status(400).send('Aucun incident trouvé');
    } else {
      incidents.forEach((doc) => {
        const incident = new Incident(
          doc.id,
          doc.data().gravite,
          doc.data().date,
          doc.data().intitule,
          doc.data().description,
        );
        incidentArray.push(incident);
      });

      res.status(200).send(incidentArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Récupérer un incident par son ID
export const getIncident = async (req, res, next) => {
  try {
    const id = req.params.id;
    const incident = doc(db, 'incidents', id);
    const data = await getDoc(incident);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('Incident non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Mettre à jour un incident
export const updateIncident = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const incident = doc(db, 'incidents', id);
    await updateDoc(incident, data);
    res.status(200).send('Incident mis à jour avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Supprimer un incident
export const deleteIncident = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'incidents', id));
    res.status(200).send('Incident supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
