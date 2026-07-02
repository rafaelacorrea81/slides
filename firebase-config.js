// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrMqHW0_bA06ro-KSDT9W81RlfvBDec6g",
  authDomain: "slides-1fce3.firebaseapp.com",
  projectId: "slides-1fce3",
  storageBucket: "slides-1fce3.firebasestorage.app",
  messagingSenderId: "852102281171",
  appId: "1:852102281171:web:a059f786c0492d01fc2126",
  measurementId: "G-L8XBJHCQGY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };