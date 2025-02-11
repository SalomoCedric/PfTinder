// Firebase Konfiguration
const firebaseConfig = {
  apiKey: "AIzaSyBX_GqLCg1yOD1aPjxHZ1bQgdTQ5B7trv8",
  authDomain: "pftinder-79946.firebaseapp.com",
  projectId: "pftinder-79946",
  storageBucket: "pftinder-79946.firebasestorage.app",
  messagingSenderId: "165850597415",
  appId: "1:165850597415:web:84e698173e2f983c4d6602"
};

// Firebase initialisieren
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Login-Funktion
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'profile.html'; // Nach Login auf die Profilseite
    } catch (error) {
        alert(error.message);
    }
});
