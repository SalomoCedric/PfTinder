// auth.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Anmeldung
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "index.html"; // Weiterleitung zur Hauptseite
    } catch (error) {
        alert("Fehler beim Anmelden: " + error.message);
    }
});

// Registrierung
document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = "index.html"; // Weiterleitung zur Hauptseite
    } catch (error) {
        alert("Fehler bei der Registrierung: " + error.message);
    }
});

// Abmeldung
document.getElementById("logout").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html"; // Zur Login-Seite weiterleiten
});

// Überwache den Authentifizierungsstatus
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Der Benutzer ist eingeloggt
        window.location.href = "index.html"; // Weiterleitung zur Hauptseite
    } else {
        // Der Benutzer ist nicht eingeloggt
        window.location.href = "login.html"; // Weiterleitung zur Login-Seite
    }
});
