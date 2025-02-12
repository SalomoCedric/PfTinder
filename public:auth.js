{\rtf1\ansi\ansicpg1252\cocoartf2820
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // public/auth.js\
document.addEventListener("DOMContentLoaded", function () \{\
    const loginForm = document.getElementById("login-form");\
    const registerForm = document.getElementById("register-form");\
\
    if (loginForm) \{\
        loginForm.addEventListener("submit", async (e) => \{\
            e.preventDefault();\
            const email = loginForm.email.value;\
            const password = loginForm.password.value;\
\
            try \{\
                await auth.signInWithEmailAndPassword(email, password);\
                window.location.href = "profile.html";\
            \} catch (error) \{\
                alert(error.message);\
            \}\
        \});\
    \}\
\
    if (registerForm) \{\
        registerForm.addEventListener("submit", async (e) => \{\
            e.preventDefault();\
            const email = registerForm.email.value;\
            const password = registerForm.password.value;\
\
            try \{\
                await auth.createUserWithEmailAndPassword(email, password);\
                window.location.href = "profile.html";\
            \} catch (error) \{\
                alert(error.message);\
            \}\
        \});\
    \}\
\});\
}