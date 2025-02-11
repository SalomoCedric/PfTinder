// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { firebaseConfig } from "./firebase-config.js";  // Firebase-Konfiguration importieren

// Firebase initialisieren
const app = initializeApp(firebaseConfig);

// Firebase-Dienste initialisieren
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exportiere die Firebase-Dienste
export { auth, db, storage, onAuthStateChanged };
