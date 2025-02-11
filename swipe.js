import { auth, db } from './firebase.js';  // Importiere auth und db aus der firebase.js Datei
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Funktion, um Profile aus der Firestore-Datenbank zu laden
async function loadProfiles() {
    const user = auth.currentUser;
    if (!user) {
        alert("Bitte einloggen!");
        return;
    }

    const profilesRef = collection(db, "users");
    const querySnapshot = await getDocs(profilesRef);
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = ""; // Clear any previous profiles

    querySnapshot.forEach((doc) => {
        if (doc.id !== user.uid) {  // Dein eigenes Profil soll nicht angezeigt werden
            const data = doc.data();
            const profileHTML = `
                <div class="profile-card">
                    <img src="${data.imageUrl}" alt="${data.name}" class="profile-img">
                    <h3 class="profile-name">${data.name}, ${data.age}</h3>
                    <p class="profile-class">${data.class}</p>
                </div>
            `;
            profileContainer.innerHTML += profileHTML;
        }
    });
}

// Funktion zum Swipen (Pass/Smash)
document.getElementById("swipe-right").addEventListener("click", () => {
    alert("Du hast nach rechts gewischt! Smash!");
    // Hier könnte die Logik für ein "Match" hinzugefügt werden
});

document.getElementById("swipe-left").addEventListener("click", () => {
    alert("Du hast nach links gewischt! Pass!");
    // Hier könnte die Logik für das Ablehnen des Profils hinzugefügt werden
});

// Lade Profile, wenn der User eingeloggt ist
onAuthStateChanged(auth, (user) => {
    if (user) {
        loadProfiles();
    }
});
