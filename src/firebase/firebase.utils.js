import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCj5vq4J8jNWVfdkBbj4xda4-dfuTHxLbc",
  authDomain: "crown-db-36a45ef.firebaseapp.com",
  databaseURL: "https://crown-db-36a45ef.firebaseio.com",
  projectId: "crown-db-36a45ef",
  storageBucket: "crown-db-36a45ef.appspot.com",
  messagingSenderId: "240130669220",
  appId: "1:240130669220:web:df7dcb7cf74881b7b78431",
  measurementId: "G-EHZ01CVG3H",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get(); // snapshot represents the user's data

  if (!snapshot.exists) {
    // if user data doesn't exist, then create user data
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
