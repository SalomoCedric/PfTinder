function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Eingeloggt als:", userCredential.user);
            window.location.href = "profile.html"; // Weiterleitung nach Login
        })
        .catch((error) => {
            console.error("Login-Fehler:", error);
            alert("Fehler beim Login: " + error.message);
        });
}

function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Registriert als:", userCredential.user);
            window.location.href = "profile.html"; // Weiterleitung nach Registrierung
        })
        .catch((error) => {
            console.error("Registrierungs-Fehler:", error);
            alert("Fehler bei der Registrierung: " + error.message);
        });
}
