// Firebase-Initialisierung und Offline-Unterstützung
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase-Konfiguration (ersetze mit deinen eigenen Daten)
const firebaseConfig = {
  apiKey: "AIzaSyBX_GqLCg1yOD1aPjxHZ1bQgdTQ5B7trv8",
  authDomain: "pftinder-79946.firebaseapp.com",
  projectId: "pftinder-79946",
  storageBucket: "pftinder-79946.firebasestorage.app",
  messagingSenderId: "165850597415",
  appId: "1:165850597415:web:84e698173e2f983c4d6602"
};
// Firebase-App initialisieren
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Offline-Unterstützung aktivieren
enableIndexedDbPersistence(db)
    .then(() => {
        console.log("Offline-Unterstützung aktiviert");
    })
    .catch((err) => {
        if (err.code === 'failed-precondition') {
            console.error("Mehrere Tabs sind geöffnet, Offline-Unterstützung fehlgeschlagen");
        } else if (err.code === 'unimplemented') {
            console.error("Der aktuelle Browser unterstützt keine Offline-Unterstützung");
        }
    });

export { auth, db };  // Firebase-Authentifizierung und Firestore exportieren
