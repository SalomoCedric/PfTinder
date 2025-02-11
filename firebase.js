import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { firebaseConfig } from "./firebase-config.js"; // Firebase-Konfiguration importieren
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const app = initializeApp(firebaseConfig);  // Firebase-App initialisieren
const db = getFirestore(app); // Firestore initialisieren
const storage = getStorage(app); // Storage initialisieren

export { db, storage };  // Firebase-Dienste exportieren
