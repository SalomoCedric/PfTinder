{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ initializeApp \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";\
import \{ getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";\
import \{ getFirestore, doc, getDoc, setDoc \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";\
\
// Firebase Konfiguration (ersetze mit deinen Firebase-Daten)\
const firebaseConfig = \{\
    apiKey: "YOUR_API_KEY",\
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",\
    projectId: "YOUR_PROJECT_ID",\
    storageBucket: "YOUR_PROJECT_ID.appspot.com",\
    messagingSenderId: "YOUR_SENDER_ID",\
    appId: "YOUR_APP_ID"\
\};\
\
// Firebase initialisieren\
const app = initializeApp(firebaseConfig);\
const auth = getAuth(app);\
const db = getFirestore(app);\
\
// Registrierung\
document.getElementById("register-btn").addEventListener("click", async () => \{\
    const email = document.getElementById("email").value;\
    const password = document.getElementById("password").value;\
\
    try \{\
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);\
        const user = userCredential.user;\
        console.log("Registriert als:", user.email);\
\
        // \'dcberpr\'fcfen, ob der User ein Profil hat\
        checkProfile(user.uid);\
    \} catch (error) \{\
        alert(error.message);\
    \}\
\});\
\
// Login\
document.getElementById("login-btn").addEventListener("click", async () => \{\
    const email = document.getElementById("email").value;\
    const password = document.getElementById("password").value;\
\
    try \{\
        const userCredential = await signInWithEmailAndPassword(auth, email, password);\
        const user = userCredential.user;\
        console.log("Eingeloggt als:", user.email);\
\
        // \'dcberpr\'fcfen, ob der User ein Profil hat\
        checkProfile(user.uid);\
    \} catch (error) \{\
        alert(error.message);\
    \}\
\});\
\
// Pr\'fcft, ob der User schon ein Profil hat\
async function checkProfile(userId) \{\
    const userDoc = await getDoc(doc(db, "users", userId));\
\
    if (userDoc.exists()) \{\
        window.location.href = "index.html"; // Falls ein Profil existiert, gehe zur Hauptseite\
    \} else \{\
        window.location.href = "profile.html"; // Falls nicht, leite zur Profilerstellung weiter\
    \}\
\}\
\
// Pr\'fcft, ob ein User eingeloggt ist\
onAuthStateChanged(auth, (user) => \{\
    if (user) \{\
        console.log("User eingeloggt:", user.email);\
    \} else \{\
        console.log("Kein User eingeloggt");\
    \}\
\});\
}