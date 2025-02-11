// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { firebaseConfig } from "./firebase-config.js"; // firebaseConfig aus der richtigen Datei importieren
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase initialisieren
const app = initializeApp(firebaseConfig);  // Hier wird die Firebase-App initialisiert
const db = getFirestore(app); // Firestore-Dienst initialisieren
const storage = getStorage(app); // Storage-Dienst initialisieren

// Exportiere die Firebase-Instanzen, damit du sie in anderen Dateien verwenden kannst
export { db, storage };
