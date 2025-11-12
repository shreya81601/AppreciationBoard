# 🎉 Dear Math Teacher - Appreciation Board Setup Guide

A collaborative web application for celebrating math teachers during Appreciation Week. This app allows students, parents, and administrators to leave heartfelt appreciation messages and later add teacher responses.

## ✨ Features

- **No login required** - Anyone with the link can participate
- **Real-time updates** - See new appreciations as they're posted
- **Flip card animations** - Hover over notes to see teacher responses
- **Role filtering** - Filter by Student, Parent, or Admin
- **Mobile-friendly** - Works on all devices
- **Two-step workflow** - Submit appreciation now, add teacher response later

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Firebase Backend

#### Step 1: Create a Firebase Project

1. Go to [https://firebase.google.com](https://firebase.google.com)
2. Click "Get Started" and sign in with your Google account
3. Click "Go to console" (top right)
4. Click "Add project" or "Create a project"
5. Enter a project name (e.g., "appreciation-board")
6. Disable Google Analytics (optional for this project)
7. Click "Create project" and wait for it to initialize

#### Step 2: Register Your Web App

1. In the Firebase console, click the Web icon **</>** to add Firebase to your web app
2. Register your app:
   - App nickname: "Appreciation Board Web" (or any name)
   - **Don't check** "Also set up Firebase Hosting" (we'll use GitHub Pages)
   - Click "Register app"
3. You'll see a `firebaseConfig` object - **keep this page open!**

#### Step 3: Set Up Firestore Database

1. In the left sidebar, click **Firestore Database**
2. Click "Create database"
3. Choose **"Start in test mode"** (allows public read/write for 30 days)
   - ⚠️ **For production**, you'll want to update security rules (see below)
4. Choose a location close to your users (e.g., `us-central1`)
5. Click "Enable"

The `appreciations` collection will be created automatically when the first document is added!

#### Step 4: Configure Firebase in Your App

1. Open `src/firebase.js`
2. Copy the `firebaseConfig` object from Firebase console (Step 2)
3. Replace the placeholder config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // Your actual API key
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
}
```

### 3. Run the App Locally

```bash
npm run dev
```

The app will start at `http://localhost:5173` (or another port if 5173 is taken).

### 4. Deploy to GitHub Pages

#### Step 1: Update Configuration

1. Open `package.json`
2. Update the `homepage` field with your GitHub username:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/AppreciationBoard"
   ```

3. If your repository name is different, also update `vite.config.js`:
   ```javascript
   base: '/YOUR_REPO_NAME/'
   ```

#### Step 2: Push to GitHub

```bash
# Initialize git (if not already done)
git add .
git commit -m "Initial commit with Firebase"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/AppreciationBoard.git
git push -u origin main
```

#### Step 3: Deploy

```bash
npm run deploy
```

This will build your app and deploy it to GitHub Pages!

#### Step 4: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select `gh-pages` branch
4. Click "Save"
5. Your site will be live at: `https://YOUR_GITHUB_USERNAME.github.io/AppreciationBoard`

## 🏗️ Project Structure

```
appreciation-board/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx    # Welcome page
│   │   ├── Board.jsx          # Main board with grid
│   │   └── StickyNote.jsx     # Individual note card
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   ├── index.css              # Styles + flip animation
│   └── firebase.js            # Firebase configuration ⚠️ ADD YOUR CONFIG HERE
├── index.html
├── package.json
├── vite.config.js             # ⚠️ UPDATE base path for GitHub Pages
└── tailwind.config.js
```

## 📝 How It Works

### User Flow

1. **Landing Page**: User sees welcome message about Appreciation Week
2. **Click "Next"**: Navigate to the main board
3. **Submit Appreciation**:
   - Select role (Student/Parent/Admin)
   - Write appreciation message
   - Click submit
4. **View All Notes**: See everyone's appreciations in a sticky note grid
5. **Hover to Flip**: Hover over any note to see the back side
6. **Add Response**: Click "Add Response" on the back to enter teacher's reply

### Technical Features

- **Real-time Sync**: Uses Firebase Firestore real-time listeners (`onSnapshot`)
- **CRUD Operations**:
  - `addDoc` - Submit new appreciation
  - `onSnapshot` - Real-time fetch all appreciations
  - `updateDoc` - Add teacher response
  - `deleteDoc` - Remove notes (testing only)
- **Flip Animation**: CSS 3D transforms on hover
- **Responsive Design**: Tailwind CSS grid adapts to screen size

## 🔒 Firebase Security Rules (Production)

After testing, update your Firestore security rules for production:

1. Go to **Firestore Database** → **Rules** in Firebase console
2. Replace with these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /appreciations/{document} {
      // Allow anyone to read all appreciations
      allow read: if true;

      // Allow anyone to create new appreciations
      allow create: if true;

      // Allow anyone to update (for adding teacher responses)
      allow update: if true;

      // Optional: Restrict delete to admin users only
      // For now, allow delete for testing
      allow delete: if true;
    }
  }
}
```

Click "Publish" to save the rules.

## 🎨 Customization

### Change Colors

Edit `src/components/StickyNote.jsx` - modify the `pastelColors` array:

```javascript
const pastelColors = [
  'bg-yellow-100',
  'bg-pink-100',
  'bg-blue-100',
  // Add your own Tailwind color classes
]
```

### Add More Roles

Edit `src/components/Board.jsx` - update the role arrays:

```javascript
{['Student', 'Parent', 'Admin', 'Teacher'].map((roleOption) => (
  // ...
))}
```

### Change Animation Speed

Edit `src/index.css` - modify the transition duration:

```css
.flip-card-inner {
  transition: transform 0.6s; /* Change to 0.3s for faster flip */
}
```

## 🐛 Troubleshooting

### "Failed to load appreciations"

- Check that your Firebase config is correct in `src/firebase.js`
- Verify Firestore is enabled in Firebase console
- Make sure security rules allow read access
- Check browser console for specific error messages

### Real-time updates not working

- Verify Firestore is set up correctly
- Check that you're using the correct Firebase config
- Look for errors in browser console

### Notes not submitting

- Verify your Firestore security rules allow `create` operations
- Check browser console for errors
- Make sure Firebase config is properly set

### GitHub Pages shows 404 error

- Verify the `base` path in `vite.config.js` matches your repository name
- Make sure `gh-pages` branch exists and is set as source in Settings → Pages
- Check that the `homepage` in `package.json` is correct

### Blank page after deployment

- Check browser console for errors
- Verify the base path matches your repository name
- Try running `npm run build && npm run preview` locally first

## 📚 Technologies Used

- **React** - UI framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling & responsive design
- **Firebase Firestore** - Database & real-time updates
- **GitHub Pages** - Free hosting

## 🤝 Contributing

Feel free to fork this project and customize it for your own appreciation events!

## 📄 License

MIT License - see LICENSE file for details

---

Made with ❤️ for celebrating amazing teachers
