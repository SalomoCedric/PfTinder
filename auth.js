import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js"; // firebaseConfig korrekt importieren

const auth = getAuth();  // Firebase-Auth initialisieren

// Überprüfen, ob der Benutzer eingeloggt ist
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Benutzer ist eingeloggt, zeige Profile und andere Daten
        loadProfiles();
    } else {
        // Benutzer ist nicht eingeloggt, zeige das Login-Formular
        document.getElementById("login-container").classList.remove("hidden");
        document.getElementById("profile-container").classList.add("hidden");
    }
});

// Login Funktion
const loginBtn = document.getElementById('login-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginBtn.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Erfolgreich eingeloggt');
    } catch (error) {
        alert('Fehler beim Anmelden: ' + error.message);
    }
});

// Logout Funktion
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    alert("Erfolgreich abgemeldet");
    location.reload();  // Seite neu laden
});
