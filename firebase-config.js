// ============================
// FIREBASE CONFIGURATION
// ============================

const firebaseConfig = {
    apiKey: "AIzaSyDB5wvRiopr-duDJAu5QvnOxCl2UEAHU4E",
    authDomain: "tempus-fugit-f0f53.firebaseapp.com",
    projectId: "tempus-fugit-f0f53",
    storageBucket: "tempus-fugit-f0f53.firebasestorage.app",
    messagingSenderId: "198763438685",
    appId: "1:198763438685:web:09341ba4aff4558e4763b4",
    measurementId: "G-266RMCKEZL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const auth = firebase.auth();
const db = firebase.firestore();

// Configure Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
