import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import config  from '../config/firebaseconfig.json';

type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

const firebaseConfig = config;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

export const getUserWithUsername = async (username: string) => {
  const userDocs =  firestore.collection("users").where("username", "==", username).limit(1).get();
  return (await userDocs).docs[0];
};

export function postToJson(doc: DocumentSnapshot) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }
};

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const increment = firebase.firestore.FieldValue.increment;