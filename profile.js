import { auth, db, storage } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
    window.location.href = "index.html"; // Nach dem Speichern zur Hauptseite
});
