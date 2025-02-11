// swipe.js
import { db } from "./firebase.js"; // Firebase-Instanz importieren
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function loadProfiles() {
    const profileContainer = document.getElementById("profile-container");
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const profileHTML = `
            <div class="profile-card">
                <img src="${data.imageUrl}" alt="${data.name}">
                <h3>${data.name}</h3>
                <p>${data.age}, ${data.class}</p>
            </div>
        `;
        profileContainer.innerHTML += profileHTML;
    });
}

loadProfiles();
