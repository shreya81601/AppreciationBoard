# 🎉 Dear Math Teacher - Appreciation Board

A collaborative web application for celebrating math teachers during Appreciation Week. Students, parents, and administrators can leave heartfelt appreciation messages and later add teacher responses - all in real-time, no login required!

![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3.4-teal)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange)

## ✨ Features

- 📝 **Anonymous submissions** - No login required
- 🔄 **Real-time updates** - See new appreciations instantly
- 🎴 **Flip card UI** - Hover to reveal teacher responses
- 📱 **Mobile-friendly** - Works on all devices
- 🎨 **Beautiful design** - Pastel sticky notes with smooth animations
- 🔍 **Role filtering** - Filter by Student, Parent, or Admin

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Configure Firebase (see NEXT_STEPS.md for quick guide)
# Edit src/firebase.js with your credentials

# Run development server
npm run dev

# Deploy to GitHub Pages
npm run deploy
```

## 📖 Full Documentation

- [NEXT_STEPS.md](./NEXT_STEPS.md) - Quick setup guide (~15 minutes)
- [SETUP.md](./SETUP.md) - Detailed Firebase & GitHub Pages setup

## 🎯 How It Works

1. Users land on a welcome page explaining Appreciation Week
2. Click "Next" to access the main board
3. Submit appreciations by selecting a role and writing a message
4. View all appreciations as sticky notes in a grid
5. Hover over notes to flip and see teacher responses
6. Anyone can come back later to add a teacher's response

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore (NoSQL + Real-time)
- **Hosting**: GitHub Pages (free!)

## 📦 Build & Deploy

```bash
# Build locally
npm run build
npm run preview  # Preview production build

# Deploy to GitHub Pages
npm run deploy
```

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details

---

Made with ❤️ for celebrating amazing math teachers
