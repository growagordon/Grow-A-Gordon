// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCI1jYDWIJK8hveWDZizQ145Z-IEuz-RQc",
  authDomain: "ilovekethup.firebaseapp.com",
  projectId: "ilovekethup",
  storageBucket: "ilovekethup.appspot.com",
  messagingSenderId: "463148273822",
  appId: "1:463148273822:web:f6c40788da13eb46083c68", // Możesz podmienić, jeśli masz dokładniejsze
  measurementId: "G-CV9B1YMW9J" // Możesz podmienić, jeśli masz dokładniejsze
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };