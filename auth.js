import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    setPersistence, 
    browserSessionPersistence, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Konfiguration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// **Login-Persistenz auf "Session" setzen**
setPersistence(auth, browserSessionPersistence).then(() => {
    console.log("Session-Persistenz aktiviert. User muss sich bei jedem Neuladen neu anmelden.");
}).catch((error) => {
    console.error("Fehler beim Setzen der Persistenz:", error);
});

// Registrierung
document.getElementById("register-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        checkProfile(userCredential.user.uid);
    } catch (error) {
        alert(error.message);
    }
});

// Login
document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        checkProfile(userCredential.user.uid);
    } catch (error) {
        alert(error.message);
    }
});

// Prüfen, ob der User ein Profil hat
async function checkProfile(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
        window.location.href = "index.html"; // Falls ein Profil existiert, weiter zur Hauptseite
    } else {
        window.location.href = "profile.html"; // Falls nicht, zur Profilerstellung weiterleiten
    }
}

// **Überprüfen, ob User eingeloggt ist – Falls nicht, zurück zur Login-Seite**
onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("Kein User eingeloggt! Leite zur Login-Seite weiter...");
        window.location.href = "login.html";
    }
});

// **Logout-Button (falls gewünscht)**
document.getElementById("logout-btn")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});
