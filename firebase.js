{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ initializeApp \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";\
import \{ getAuth \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";\
import \{ getFirestore \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";\
import \{ getStorage \} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";\
\
// Firebase Konfiguration\
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
const storage = getStorage(app);\
\
export \{ auth, db, storage \};\
}