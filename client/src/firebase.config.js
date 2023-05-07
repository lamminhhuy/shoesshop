import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBRx18yLjys6LxvgtbnA9GBSljSeiFS2zo",
    authDomain: "shoeshop-a401e.firebaseapp.com",
    databaseURL: "https://shoeshop-a401e-default-rtdb.firebaseio.com",
    projectId: "shoeshop-a401e",
    storageBucket: "shoeshop-a401e.appspot.com",
    messagingSenderId: "222710281241",
    appId: "1:222710281241:web:b6b0346c176f96c36c2688",
};
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore =  getFirestore(app);
const storage = getStorage(app);
export {app,firestore,storage};