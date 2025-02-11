import { auth, db } from "./firebase.js";  // Stelle sicher, dass du die richtigen Firebase-Dienste importierst
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";  // Importiere onAuthStateChanged

// Wenn der Benutzer eingeloggt ist, werden Profile geladen
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Benutzer ist eingeloggt, Profile anzeigen
        loadProfiles();
    } else {
        // Benutzer ist nicht eingeloggt, zeige das Login-Formular
        document.getElementById("login-container").classList.remove("hidden");
        document.getElementById("profile-container").classList.add("hidden");
    }
});

// Funktion zum Laden der Profile
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
