import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDiFlzP9uTTyrJY0GNkgimkgQBqDLjLT20',
  authDomain: 'crwn-db-b313e.firebaseapp.com',
  databaseURL: 'https://crwn-db-b313e.firebaseio.com',
  projectId: 'crwn-db-b313e',
  storageBucket: 'crwn-db-b313e.appspot.com',
  messagingSenderId: '217793015329',
  appId: '1:217793015329:web:656b836eee9fa7ebec3d60',
  measurementId: 'G-1THBJB31YP'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  let snapShot = await userRef.get();
  console.log(userRef);
  console.log(snapShot);
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log('error creating user', err.message);
    }
  }
  snapShot = await userRef.get();
  console.log(snapShot);
  return userRef;
};

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
