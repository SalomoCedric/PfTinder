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

import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Konfiguration (ersetze mit deinen Daten
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

// **Session-Persistenz aktivieren (User muss sich nach Schließen neu anmelden)**
setPersistence(auth, browserSessionPersistence)
    .then(() => console.log("Session-Persistenz aktiviert: User muss sich nach dem Schließen neu anmelden."))
    .catch((error) => console.error("Fehler beim Setzen der Persistenz:", error));

// **Registrierung**
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

// **Login**
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

// **Prüfen, ob der User ein Profil hat**
async function checkProfile(userId) {
    const userDoc = await getDoc(doc(db, "users", userId));

    if (userDoc.exists()) {
        window.location.href = "index.html"; // Falls ein Profil existiert → zur Hauptseite
    } else {
        window.location.href = "profile.html"; // Falls nicht → zur Profilerstellung
    }
}

// **Logout-Funktion**
document.getElementById("logout-btn")?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html"; // Zurück zum Login
});
