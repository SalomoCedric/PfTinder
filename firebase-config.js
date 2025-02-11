import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Konfiguration (ersetze mit deinen echten Daten)
const firebaseConfig = {
  apiKey: "AIzaSyBX_GqLCg1yOD1aPjxHZ1bQgdTQ5B7trv8",
  authDomain: "pftinder-79946.firebaseapp.com",
  projectId: "pftinder-79946",
  storageBucket: "pftinder-79946.firebasestorage.app",
  messagingSenderId: "165850597415",
  appId: "1:165850597415:web:84e698173e2f983c4d6602"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Registrierung mit E-Mail und Passwort
async function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Benutzer in Firestore speichern
        await setDoc(doc(db, "users", user.uid), {
            email: user.email
        });

        alert("Registrierung erfolgreich!");
    } catch (error) {
        alert(error.message);
    }
}

// Login mit E-Mail und Passwort
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login erfolgreich!");
    } catch (error) {
        alert(error.message);
    }
}

// Logout-Funktion
function logout() {
    signOut(auth).then(() => {
        alert("Abgemeldet!");
    });
}

// Event Listener für Buttons
document.getElementById("register-btn").addEventListener("click", register);
document.getElementById("login-btn").addEventListener("click", login);
document.getElementById("logout-btn").addEventListener("click", logout);
