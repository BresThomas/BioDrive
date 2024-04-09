const firebase = require('../Firebase.js');
const CompteEnergie = require('../models/compteEnergieModel.js');
const { getFirestore, collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } = require('firebase/firestore');

const db = getFirestore(firebase);

// Créer un compte énergie
exports.createCompteEnergie = async (req, res, next) => {
  try {
    const data = req.body;
    const compteEnergie = await addDoc(collection(db, 'comptesEnergie'), data);
    res.status(200).json({ id: compteEnergie.id }); // Renvoie un objet JSON avec l'ID du compte énergie
  } catch (error) {
    res.status(400).json({ error: error.message }); // Renvoie un objet JSON avec le message d'erreur en cas d'échec
  }
};


// Récupérer tous les comptes énergie
exports.getComptesEnergie = async (req, res, next) => {
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
          doc.data().id_avantage,
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
exports.getCompteEnergie = async (req, res, next) => {
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
exports.updateCompteEnergie = async (req, res, next) => {
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

// Mettre à jour un compte énergie avec une nouvelle transaction
exports.updateCompteEnergieTransaction = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const compteEnergie = doc(db, 'comptesEnergie', id);
    const compteEnergieData = await getDoc(compteEnergie);
    if (compteEnergieData.exists()) {
      const transactions = compteEnergieData.data().transactions;
      transactions.push(data);
      await updateDoc(compteEnergie, { transactions });
      res.status(200).send('Transaction ajoutée avec succès');
    } else {
      res.status(404).send('Compte énergie non trouvé');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// Supprimer un compte énergie
exports.deleteCompteEnergie = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'comptesEnergie', id));
    res.status(200).send('Compte énergie supprimé avec succès');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
