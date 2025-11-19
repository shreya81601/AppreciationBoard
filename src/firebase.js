import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

/**
 * FIREBASE SETUP INSTRUCTIONS:
 *
 * 1. Go to https://firebase.google.com and sign in with your Google account
 * 2. Click "Go to console" (top right)
 * 3. Click "Add project" or "Create a project"
 * 4. Enter a project name (e.g., "appreciation-board")
 * 5. Disable Google Analytics (optional) and click "Create project"
 *
 * 6. Once created, click the Web icon (</>) to add Firebase to your web app
 * 7. Register your app with a nickname (e.g., "Appreciation Board Web")
 * 8. Copy the firebaseConfig object shown and replace the config below
 *
 * 9. Set up Firestore Database:
 *    - In Firebase Console, go to "Firestore Database" in the left menu
 *    - Click "Create database"
 *    - Choose "Start in test mode" (for development) - WARNING: This allows public read/write
 *    - For production, you'll want to set up security rules (see below)
 *    - Choose a location close to your users
 *    - Click "Enable"
 *
 * 10. The "appreciations" collection will be created automatically when you add the first document
 *
 * SECURITY RULES (Optional - for production):
 * Go to Firestore Database > Rules and use these rules for public access:
 *
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     match /appreciations/{document} {
 *       allow read: if true;
 *       allow create: if true;
 *       allow update: if true;
 *       allow delete: if true;
 *     }
 *   }
 * }
 */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqzbWoDyM6DH5dfGcV6n42NgTO6XipMc4",
  authDomain: "appreciation-board.firebaseapp.com",
  projectId: "appreciation-board",
  storageBucket: "appreciation-board.firebasestorage.app",
  messagingSenderId: "292163398326",
  appId: "1:292163398326:web:2ba204ccf6bdbd11631417"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)
