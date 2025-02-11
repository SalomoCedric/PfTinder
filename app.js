import { auth, db } from "./firebase-config.js";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Function to handle swipes
async function swipe(action) {
    const user = auth.currentUser;
    if (!user) return alert("Please log in first!");

    const otherUserId = "exampleUser123"; // Replace with dynamic user IDs

    // Save swipe in Firestore
    await setDoc(doc(db, "swipes", `${user.uid}_${otherUserId}`), {
        action,
        userId: user.uid,
        otherUserId
    });

    // Check for a match
    const otherSwipeRef = doc(db, "swipes", `${otherUserId}_${user.uid}`);
    const otherSwipeSnap = await getDoc(otherSwipeRef);

    if (otherSwipeSnap.exists() && otherSwipeSnap.data().action === "smash") {
        alert("It's a match! ❤️");
    }
}

// Button event listeners
document.getElementById("smash-btn").addEventListener("click", () => swipe("smash"));
document.getElementById("pass-btn").addEventListener("click", () => swipe("pass"));
