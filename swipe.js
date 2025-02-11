// swipe.js
import { auth } from './auth.js';
import { loadProfiles } from './firebase.js';

// Funktion zum Swipen von Profilen
function swipe(profileId, action) {
    // Logik für das Swipen (Pass oder Smash)
    console.log(`Profil ${profileId} wurde ${action}ed.`);
}

// Beispiel zum Laden von Profilen und Swipen
loadProfiles();
