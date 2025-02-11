// Firebase initialisieren (nur wenn Firebase noch nicht initialisiert wurde)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

async function loadProfiles() {
    const user = auth.currentUser;

    if (!user) {
        window.location.href = 'login.html'; // Wenn nicht eingeloggt, zurück zum Login
    }

    const querySnapshot = await db.collection('users').get();
    const profilesContainer = document.getElementById('profile-container');
    profilesContainer.innerHTML = '';

    querySnapshot.forEach(doc => {
        const data = doc.data();
        if (doc.id !== user.uid) {
            profilesContainer.innerHTML += `
                <div class="profile-card">
                    <img src="${data.imageUrl}" alt="${data.name}" />
                    <h2>${data.name}</h2>
                    <p>${data.age} Jahre alt</p>
                    <p>Klasse: ${data.class}</p>
                </div>
            `;
        }
    });
}

document.getElementById('swipe-right').addEventListener('click', () => {
    alert('Profile gematcht!');
    loadProfiles(); // Lade neue Profile
});

document.getElementById('swipe-left').addEventListener('click', () => {
    loadProfiles(); // Lade neue Profile
});
