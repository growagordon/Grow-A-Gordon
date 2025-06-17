// firebase-config.js

// Konfiguracja Firebase dla projektu ilovekethup lub rodlox-6d208
const firebaseConfig = {
  apiKey: "AIzaSyCEuqxies1_pML4aup9hQ7-0R4u4TutHEc",
  authDomain: "rodlox-6d208.firebaseapp.com",
  projectId: "rodlox-6d208",
  storageBucket: "rodlox-6d208.firebasestorage.app",
  messagingSenderId: "511664026553",
  appId: "1:511664026553:web:f6c40788da13eb46083c68",
  measurementId: "G-CV9B1YMW9J"
};

// Inicjalizacja Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();