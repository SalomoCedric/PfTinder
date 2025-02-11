{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ auth, db \} from "./firebase-config.js";\
import \{ doc, setDoc, getDoc \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";\
\
// Function to handle swipes\
async function swipe(action, otherUserId) \{\
    const user = auth.currentUser;\
    if (!user) return alert("Please log in first!");\
\
    // Save swipe action in Firestore\
    await setDoc(doc(db, "swipes", `$\{user.uid\}_$\{otherUserId\}`), \{\
        action,\
        userId: user.uid,\
        otherUserId\
    \});\
\
    // Check for a match\
    const otherSwipe = await getDoc(doc(db, "swipes", `$\{otherUserId\}_$\{user.uid\}`));\
    if (otherSwipe.exists() && otherSwipe.data().action === "smash") \{\
        alert("It's a match! \uc0\u10084 \u65039 ");\
    \}\
\}\
\
// Event listeners for buttons\
document.getElementById("smash-btn").addEventListener("click", () => swipe("smash", "OTHER_USER_ID"));\
document.getElementById("pass-btn").addEventListener("click", () => swipe("pass", "OTHER_USER_ID"));\
}