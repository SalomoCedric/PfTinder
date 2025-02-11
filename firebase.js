// firebase.js
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Firebase-Konfiguration (ersetze mit deinen eigenen Daten)
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firestore und Storage initialisieren
const db = getFirestore();
const storage = getStorage();

// Profile laden
async function loadProfiles() {
    const profilesRef = collection(db, "users");
    const querySnapshot = await getDocs(profilesRef);
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const profileHTML = `
            <div class="p-4 border rounded-lg">
                <img src="${data.imageUrl}" class="w-32 h-32 object-cover rounded-full">
                <h3 class="text-lg font-bold">${data.name}, ${data.age}</h3>
                <p>Klasse: ${data.class}</p>
            </div>
        `;
        profileContainer.innerHTML += profileHTML;
    });
}

// Profil speichern
async function saveProfile(user, name, age, className, imageFile) {
    if (!name || !age || !className || !imageFile) {
        alert("Bitte alle Felder ausfüllen!");
        return;
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
}
