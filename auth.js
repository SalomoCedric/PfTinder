// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Einloggen
document.getElementById("login-btn").addEventListener("click", () => {
    const email = prompt("E-Mail eingeben:");
    const password = prompt("Passwort eingeben:");

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Erfolgreich eingeloggt!");
            document.getElementById("login-container").classList.add("hidden");
            document.getElementById("profile-container").classList.remove("hidden");
            loadProfiles();
        })
        .catch((error) => {
            console.error("Fehler beim Einloggen:", error.message);
            alert("Fehler beim Einloggen. Bitte versuche es erneut.");
        });
});

// Prüfen, ob der Benutzer eingeloggt ist
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Benutzer eingeloggt:", user);
    } else {
        console.log("Benutzer ist nicht eingeloggt.");
    }
});
