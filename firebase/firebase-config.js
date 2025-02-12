{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // firebase/firebase-config.js\
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
firebase.initializeApp(firebaseConfig);\
const auth = firebase.auth();\
const db = firebase.firestore();\
}
