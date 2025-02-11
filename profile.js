// profile.js
import { saveProfile } from './firebase.js';
import { auth } from './auth.js';

document.getElementById("save-profile").addEventListener("click", () => {
    const user = auth.currentUser;
    if (!user) {
        alert("Bitte einloggen!");
        return;
    }

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const className = document.getElementById("class").value;
    const imageFile = document.getElementById("image").files[0];

    saveProfile(user, name, age, className, imageFile);
});
