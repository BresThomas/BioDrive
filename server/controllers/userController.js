const firebase = require('../Firebase.js');
const User = require('../models/userModel.js');

const {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require('firebase/firestore');

const db = getFirestore(firebase);

exports.createUser = async (req, res, next) => {
    try {
      const data = req.body;
      await addDoc(collection(db, 'users'), data);
      res.status(200).send('user created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

exports.getUsers = async (req, res, next) => {
    try {
      const users = await getDocs(collection(db, 'users'));
      const userArray = [];
  
      if (users.empty) {
        res.status(400).send('No users found');
      } else {
        users.forEach((doc) => {
          const user = new User(
            doc.id,
            doc.data().admin
          );
          userArray.push(user);
        });
  
        res.status(200).send(userArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  exports.getUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const userDoc = doc(db, 'users', id);
      const data = await getDoc(userDoc);
      if (data.exists()) {
        res.status(200).send(data.data());
      } else {
        res.status(404).send('user not found');
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, data); // Correction ici, userDoc au lieu de user
    res.status(200).send('user updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'users', id));
    res.status(200).send('user deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

