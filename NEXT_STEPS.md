# 🚀 Next Steps to Get Your App Running

Your React + Firebase Appreciation Board is ready to go! Follow these steps to launch it:

## ⚠️ REQUIRED: Configure Firebase

Before running the app, you MUST set up your Firebase backend:

### 1. Create Firebase Project (5 minutes)

1. Go to [https://firebase.google.com](https://firebase.google.com) and sign in
2. Click "Go to console" → "Add project"
3. Name your project (e.g., "appreciation-board")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2. Register Web App (2 minutes)

1. In Firebase console, click the **</>** Web icon
2. App nickname: "Appreciation Board"
3. Don't check "Firebase Hosting"
4. Click "Register app"
5. **Copy the `firebaseConfig` object shown** - you'll need this!

### 3. Set Up Firestore Database (1 minute)

1. Go to **Firestore Database** in left menu
2. Click "Create database"
3. Choose **"Start in test mode"** (easiest for now)
4. Select a location (e.g., `us-central1`)
5. Click "Enable"

### 4. Add Firebase Config to Your App (1 minute)

Open `src/firebase.js` and replace this section:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

With your actual config from step 2 above.

## 🎉 Run Locally

```bash
npm run dev
```

Open http://localhost:5173 and test it out!

## 🌐 Deploy to GitHub Pages

### 1. Update Configuration (1 minute)

**a) Update package.json:**

Open `package.json` and change:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/AppreciationBoard"
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.

**b) If your repo has a different name:**

Open `vite.config.js` and update:
```javascript
base: '/YOUR_REPO_NAME/'
```

### 2. Push to GitHub (2 minutes)

```bash
git add .
git commit -m "Configure Firebase and GitHub Pages"
git push
```

### 3. Deploy! (1 minute)

```bash
npm run deploy
```

This builds your app and pushes it to a `gh-pages` branch.

### 4. Enable GitHub Pages (1 minute)

1. Go to your GitHub repo → **Settings** → **Pages**
2. Under "Source", select branch: `gh-pages`
3. Click "Save"
4. Wait ~1 minute, then your app will be live at:
   ```
   https://YOUR_GITHUB_USERNAME.github.io/AppreciationBoard
   ```

## ✅ Test It Out

1. Open your deployed URL
2. You should see the landing page
3. Click "Next"
4. Submit a test appreciation
5. The note should appear in the grid
6. Hover to flip the card
7. Click "Add Response" to add a teacher's response
8. Open in another browser/tab - changes appear in real-time!

## 🐛 Troubleshooting

### App won't start locally
- Make sure you ran `npm install`
- Check that Firebase config is added in `src/firebase.js`
- Look for errors in terminal

### "Failed to load appreciations"
- Verify Firebase config is correct
- Make sure Firestore database is created and in "test mode"
- Check browser console (F12) for specific errors

### GitHub Pages shows blank page
- Verify `base` in `vite.config.js` matches your repo name
- Check browser console for 404 errors on JavaScript files
- Make sure `homepage` in `package.json` is correct

### GitHub Pages shows 404
- Wait 1-2 minutes after first deploy
- Verify `gh-pages` branch was created
- Check Settings → Pages shows the correct source

### Real-time updates not working
- Verify Firestore is enabled (not Realtime Database!)
- Check Firebase console for errors
- Make sure you're in "test mode" with public read/write rules

## 📖 Need More Help?

See SETUP.md for detailed step-by-step instructions.

---

**Total setup time: ~15 minutes** ⏱️

Once deployed, share the link with everyone - no additional setup needed!
