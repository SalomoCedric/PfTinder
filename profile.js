auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("username").innerText = user.email;
    } else {
        window.location.href = "login.html"; // Falls nicht eingeloggt, umleiten
    }
});

function logout() {
    auth.signOut().then(() => {
        window.location.href = "login.html";
    }).catch(error => {
        console.error("Logout-Fehler:", error);
    });
}
