{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ auth, db, storage \} from "./firebase-config.js";\
import \{ doc, setDoc, getDoc \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";\
import \{ ref, uploadBytes, getDownloadURL \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";\
\
// Funktion zum Hochladen eines Bildes\
async function uploadImage(file) \{\
    const user = auth.currentUser;\
    if (!user) return;\
\
    const storageRef = ref(storage, `profile_pictures/$\{user.uid\}`);\
    await uploadBytes(storageRef, file);\
    return await getDownloadURL(storageRef);\
\}\
\
// Funktion zum Speichern des Profils\
async function saveProfile() \{\
    const user = auth.currentUser;\
    if (!user) return alert("Bitte einloggen!");\
\
    const name = document.getElementById("name").value;\
    const age = document.getElementById("age").value;\
    const userClass = document.getElementById("class").value;\
    const file = document.getElementById("profile-image").files[0];\
\
    let profileImageUrl = "";\
    if (file) \{\
        profileImageUrl = await uploadImage(file);\
    \}\
\
    await setDoc(doc(db, "users", user.uid), \{\
        name,\
        age,\
        class: userClass,\
        profileImage: profileImageUrl\
    \});\
\
    alert("Profil gespeichert!");\
\}\
\
// Profil-Daten abrufen\
async function loadProfile() \{\
    const user = auth.currentUser;\
    if (!user) return;\
\
    const userDoc = await getDoc(doc(db, "users", user.uid));\
    if (userDoc.exists()) \{\
        const data = userDoc.data();\
        document.getElementById("name").value = data.name || "";\
        document.getElementById("age").value = data.age || "";\
        document.getElementById("class").value = data.class || "";\
        if (data.profileImage) \{\
            document.getElementById("profile-preview").src = data.profileImage;\
        \}\
    \}\
\}\
\
// Event Listener f\'fcr Buttons\
document.getElementById("save-profile").addEventListener("click", saveProfile);\
document.addEventListener("DOMContentLoaded", loadProfile);\
}