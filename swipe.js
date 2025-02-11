{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ auth, db \} from "./firebase-config.js";\
import \{ doc, setDoc, getDoc, collection, getDocs \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";\
\
let users = [];\
let currentIndex = 0;\
\
// Nutzer aus Firestore abrufen\
async function loadUsers() \{\
    const user = auth.currentUser;\
    if (!user) return;\
\
    const querySnapshot = await getDocs(collection(db, "users"));\
    users = querySnapshot.docs\
        .map(doc => (\{ id: doc.id, ...doc.data() \}))\
        .filter(u => u.id !== user.uid);\
\
    showUser();\
\}\
\
// Profil auf der Karte anzeigen\
function showUser() \{\
    if (currentIndex >= users.length) \{\
        document.getElementById("profile-container").innerHTML = "<p>Keine weiteren Nutzer!</p>";\
        return;\
    \}\
\
    const user = users[currentIndex];\
    document.getElementById("profile-name").innerText = user.name;\
    document.getElementById("profile-age").innerText = `Alter: $\{user.age\}`;\
    document.getElementById("profile-class").innerText = `Klasse: $\{user.class\}`;\
    document.getElementById("profile-image").src = user.profileImage;\
\}\
\
// Swipe speichern und zum n\'e4chsten wechseln\
async function swipe(action) \{\
    const user = auth.currentUser;\
    if (!user) return;\
\
    const otherUserId = users[currentIndex].id;\
    await setDoc(doc(db, "swipes", `$\{user.uid\}_$\{otherUserId\}`), \{\
        action,\
        userId: user.uid,\
        otherUserId\
    \});\
\
    currentIndex++;\
    showUser();\
\}\
\
// Event Listener f\'fcr Swipes\
document.getElementById("smash-btn").addEventListener("click", () => swipe("smash"));\
document.getElementById("pass-btn").addEventListener("click", () => swipe("pass"));\
\
// Nutzer laden\
document.addEventListener("DOMContentLoaded", loadUsers);\
}