// swipe.js
import { auth, db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Profile laden
async function loadProfiles() {
    const user = auth.currentUser;
    if (!user) return; // Wenn der User nicht eingeloggt ist, keine Profile laden

    const profilesRef = collection(db, "users");
    const querySnapshot = await getDocs(profilesRef);
    const profileContainer = document.getElementById("profile-container");
    profileContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
        if (doc.id !== user.uid) { // Eigene Profile nicht anzeigen
            const data = doc.data();
            const profileHTML = `
                <div class="p-4 border rounded-lg">
                    <img src="${data.imageUrl}" class="w-32 h-32 object-cover rounded-full">
                    <h3 class="text-lg font-bold">${data.name}, ${data.age}</h3>
                    <p>Klasse: ${data.class}</p>
                    <button class="smash-btn" data-id="${doc.id}">🔥 Smash</button>
                    <button class="pass-btn" data-id="${doc.id}">❌ Pass</button>
                </div>
            `;
            profileContainer.innerHTML += profileHTML;
        }
    });

    // Event Listener für Buttons
    document.querySelectorAll(".smash-btn").forEach((button) => {
        button.addEventListener("click", () => handleSwipe(button.dataset.id, "smash"));
    });

    document.querySelectorAll(".pass-btn").forEach((button) => {
        button.addEventListener("click", () => handleSwipe(button.dataset.id, "pass"));
    });
}

// Swipen speichern
async function handleSwipe(targetUserId, action) {
    console.log(`User swiped ${action} on ${targetUserId}`);
}

// Lade Profile, wenn der User eingeloggt ist
auth.onAuthStateChanged((user) => {
    if (user) {
        loadProfiles();
    } else {
        window.location.href = "login.html"; // Zur Login-Seite weiterleiten
    }
});
