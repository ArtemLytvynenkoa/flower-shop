// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBUCgC9O3h4U-EVYX0nvYFzSJg2rcHRNxk',
  authDomain: 'flower-shop-9a499.firebaseapp.com',
  projectId: 'flower-shop-9a499',
  storageBucket: 'flower-shop-9a499.appspot.com',
  messagingSenderId: '4297940368',
  appId: '1:4297940368:web:03e272309587bdca352715',
  measurementId: 'G-Q1HR7XMNWZ',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const storage = getStorage(app);
export const auth = getAuth(app);

export const goodsRef = collection(db, 'goods');
export const usersRef = collection(db, 'users');
export const ordersRef = collection(db, 'orders');

export const setUser = async data => {
  await setDoc(doc(usersRef, data.uid), data);
};

export const updateUser = async (data, id) => {
  await updateDoc(doc(usersRef, id), data);
};

export const setGood = async data => {
  await setDoc(doc(goodsRef, data.id), data);
};

export const updateGood = async (data, id) => {
  await updateDoc(doc(goodsRef, id), data);
};

export const deleteGood = async id => {
  await deleteDoc(doc(goodsRef, id));
};

export const setOrder = async data => {
  await setDoc(doc(ordersRef), data);
};
