// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const goodsRef = collection(db, 'goods');
export const usersRef = collection(db, 'users');
export const ordersRef = collection(db, 'orders');
export const auth = getAuth(app);

export const setUser = async data => {
  await addDoc(usersRef, data);
};

export const setGood = async data => {
  await addDoc(goodsRef, data);
};

export const setOrder = async data => {
  await addDoc(ordersRef, data);
};