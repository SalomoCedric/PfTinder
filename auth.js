// auth.js
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase.js"; // Firebase Auth importieren

// Anmelde- und Registrierungshandling
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

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Benutzer ist eingeloggt, zeige das Profil
        loadProfiles();
    } else {
        // Benutzer ist nicht eingeloggt, zeige Login-Formular
        document.getElementById("login-container").classList.remove("hidden");
        document.getElementById("profile-container").classList.add("hidden");
    }
});

// Logout
const logoutBtn = document.getElementById('logout-btn');
logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
    alert("Erfolgreich abgemeldet");
    location.reload();  // Seite neu laden, um das Login-Formular zu zeigen
});
