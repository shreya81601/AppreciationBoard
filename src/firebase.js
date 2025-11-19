import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

/**
 * FIREBASE REALTIME DATABASE SETUP INSTRUCTIONS:
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
 * 9. Set up Realtime Database:
 *    - In Firebase Console, go to "Realtime Database" in the left menu
 *    - Click "Create Database"
 *    - Choose a location close to your users
 *    - Start in "test mode" (for development) - WARNING: This allows public read/write
 *    - Click "Enable"
 *
 * 10. The "appreciations" node will be created automatically when you add the first item
 *
 * SECURITY RULES (Optional - for production):
 * Go to Realtime Database > Rules and use these rules for public access:
 *
 * {
 *   "rules": {
 *     "appreciations": {
 *       ".read": true,
 *       ".write": true
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

// Initialize Realtime Database
export const db = getDatabase(app)
