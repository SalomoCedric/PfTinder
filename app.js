import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase Konfiguration (ersetze mit deinen eigenen Daten)
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
const storage = getStorage(app);

// Profil speichern
document.getElementById("save-profile").addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return alert("Bitte einloggen!");

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const className = document.getElementById("class").value;
    const imageFile = document.getElementById("image").files[0];

    if (!name || !age || !className || !imageFile) {
        return alert("Bitte alle Felder ausfüllen!");
    }

    // Bild hochladen
    const imageRef = ref(storage, `profile_pics/${user.uid}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Profil speichern
    await setDoc(doc(db, "users", user.uid), {
        name,
        age,
        class: className,
        imageUrl
    });

    alert("Profil gespeichert!");
});

// Profile zum Swipen laden
async function loadProfiles() {
    const user = auth.currentUser;
    if (!user) return;

    const profilesRef = collection(db, "users");
    const querySnapshot = await getDocs(profilesRef);
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        if (doc.id !== user.uid) {  // Eigene Profile nicht anzeigen
            const data = doc.data();
            const profileHTML = `
                <div class="p-4 border rounded-lg">
                    <img src="${data.imageUrl}" class="w-32 h-32 object-cover rounded-full">
                    <h3 class="text-lg font-bold">${data.name}, ${data.age}</h3>
                    <p>Klasse: ${data.class}</p>
                </div>
            `;
            profileContainer.innerHTML += profileHTML;
        }
    });
}

// Lade Profile, wenn der User eingeloggt ist
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadProfiles();
    }
});
