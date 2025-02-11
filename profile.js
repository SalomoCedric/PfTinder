// Firebase initialisieren (nur wenn Firebase noch nicht initialisiert wurde)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const profileForm = document.getElementById('profile-form');
const user = auth.currentUser;

if (!user) {
    window.location.href = 'login.html'; // Falls nicht eingeloggt, zurück zum Login
}

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const className = document.getElementById('class').value;
    const imageFile = document.getElementById('image').files[0];

    if (name && age && className && imageFile) {
        // Bild hochladen
        const imageRef = storage.ref(`profile_pics/${user.uid}`);
        await imageRef.put(imageFile);
        const imageUrl = await imageRef.getDownloadURL();

        // Profil speichern
        await db.collection('users').doc(user.uid).set({
            name,
            age,
            class: className,
            imageUrl
        });

        alert('Profil gespeichert!');
    } else {
        alert('Bitte alle Felder ausfüllen.');
    }
});
