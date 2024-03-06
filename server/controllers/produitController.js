import firebase from '../Firebase.js';
import Produit from '../models/produitModel.js';
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


export const createProduit = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'Produits'), data);
      res.status(200).send('Produit created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };


  export const getProduits = async (req, res, next) => {
    try {
      const Produits = await getDocs(collection(db, 'Produits'));
      const ProduitArray = [];
  
      if (Produits.empty) {
        res.status(400).send('No Produits found');
      } else {
        Produits.forEach((doc) => {
          const Produit = new Produit(
            doc.id,
            doc.data().type,
            doc.data().nom,
            doc.data().prixClient,
            doc.data().prixFournisseur,
            doc.data().test,
          );
          ProduitArray.push(Produit);
        });
  
        res.status(200).send(ProduitArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const getProduit = async (req, res, next) => {
    try {
      const id = req.params.id;
      const Produit = doc(db, 'Produits', id);
      const data = await getDoc(Produit);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('Produit not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const updateProduit = async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const Produit = doc(db, 'Produits', id);
      await updateDoc(Produit, data);
      res.status(200).send('Produit updated successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  export const deleteProduit = async (req, res, next) => {
    try {
      const id = req.params.id;
      await deleteDoc(doc(db, 'Produits', id));
      res.status(200).send('Produit deleted successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };