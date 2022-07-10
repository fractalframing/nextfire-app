import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import config  from '../config/firebaseconfig.json';

const firebaseConfig = config;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
