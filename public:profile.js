{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // public/profile.js\
document.addEventListener("DOMContentLoaded", async function () \{\
    const profileForm = document.getElementById("profile-form");\
    const user = auth.currentUser;\
\
    if (!user) \{\
        window.location.href = "index.html";\
        return;\
    \}\
\
    profileForm.addEventListener("submit", async (e) => \{\
        e.preventDefault();\
        const name = profileForm.name.value;\
        const age = profileForm.age.value;\
        const userClass = profileForm.class.value;\
\
        await db.collection("users").doc(user.uid).set(\{\
            name,\
            age,\
            class: userClass,\
            uid: user.uid,\
            likes: []\
        \});\
\
        window.location.href = "swipe.html";\
    \});\
\});\
}