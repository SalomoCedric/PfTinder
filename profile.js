// profile.js
import { db, storage } from "./firebase.js"; // Firebase-Dienste importieren
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const auth = getAuth();

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
        document.getElementById("profile-container").classList.remove("hidden");
        document.getElementById("login-container").classList.add("hidden");
    } else {
        document.getElementById("profile-container").classList.add("hidden");
        document.getElementById("login-container").classList.remove("hidden");
    }
});
