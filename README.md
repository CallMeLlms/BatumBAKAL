<div align="center">

# BatumBAKAL

### A Mobile Fitness Tracking App for Planning and Logging Gym Workouts

[![React Native](https://img.shields.io/badge/React%20Native-0.76.9-61DAFB?style=flat-square&logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~52.0.49-000020?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey?style=flat-square)](https://github.com/CallMeLlms/BatumBAKAL)
[![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)](https://github.com/CallMeLlms/BatumBAKAL)

</div>

---

> ⚠️ **This project is currently under active development.** Features and the API contract are subject to change. Some screens and flows are still in progress.

---

## 📖 Overview

**BatumBAKAL** is a mobile fitness tracking application built with **React Native** and **Expo**, designed to help users plan gym programs, build workout days, and log their training sessions. The app connects to a backend REST API and provides a clean, structured experience for tracking fitness progress over time.

It features authentication screens, program creation flows, workout-day building, progress tracking, logging, and a profile tab — all connected to a live backend service.

---

## ✨ Features

- **Authentication** — Secure login and registration flows with token-based sessions via `expo-secure-store`
- **Program Creation** — Build and manage personalized gym programs with structured workout days
- **Workout Day Builder** — Add, organize, and configure exercises within each training day
- **Workout Logging** — Log completed sessions and track what was done each day
- **Progress Tracking** — Visualize workout history and monitor fitness progress over time
- **Profile Management** — View and update user profile information
- **Bottom Sheet UI** — Smooth interactive sheets for quick data entry via `@gorhom/bottom-sheet`
- **Haptic Feedback** — Tactile responses using `expo-haptics` for a polished native feel
- **Skia Graphics** — High-performance 2D rendering for charts and visual elements via `@shopify/react-native-skia`
- **CI Safety Scan** — GitHub Actions workflow that scans PRs and pushes to `master` for exposed secrets, local URLs, or sensitive debug logs

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React Native 0.76.9 |
| **Platform** | Expo ~52.0.49 |
| **Language** | TypeScript 5.3.3 |
| **Routing** | Expo Router ~4.0.22 |
| **Navigation** | React Navigation v7 (Bottom Tabs) |
| **State Management** | Zustand ^5.0.11 |
| **Forms** | React Hook Form ^7.71.1 |
| **HTTP Client** | Axios ^1.13.2 |
| **Secure Storage** | Expo SecureStore ~14.0.1 |
| **Styling** | NativeWind ^4.2.1 + Tailwind CSS ^3.4.19 |
| **Graphics** | Shopify React Native Skia 1.5.0 |
| **UI Primitives** | rn-primitives (portal, separator, slot) |
| **Bottom Sheet** | @gorhom/bottom-sheet ^5.2.8 |
| **Animations** | React Native Reanimated ~3.16.1, react-native-worklets |
| **Gestures** | React Native Gesture Handler ~2.20.2 |
| **Icons** | @expo/vector-icons ~14.0.4 |
| **Fonts** | Inter (via @expo-google-fonts/inter) |
| **Config** | dotenv ^17.3.1, app.config.ts |
| **Testing** | Jest ^29.2.1 + jest-expo ~52.0.6 |
| **Linting** | ESLint 8.57.0 (eslint-config-expo) |

---

## 📁 Project Structure

```
BatumBAKAL/
├── .github/
│   └── workflows/           # GitHub Actions CI safety scan
├── api/                     # API call functions and endpoint definitions
├── app/                     # Expo Router screens and layouts
├── assets/                  # Images, fonts, and static files
├── components/              # Reusable UI components
├── config/                  # App-wide configuration and constants
├── constants/               # Theme colors, spacing, and shared values
├── hooks/                   # Custom React hooks
├── lib/                     # Utility libraries and third-party wrappers
├── scripts/                 # Dev scripts (e.g. project reset)
├── stores/                  # Zustand global state stores
├── utils/                   # Helper functions and shared utilities
├── app.config.ts            # Expo dynamic config (API URL injection)
├── app.json                 # Base Expo app configuration
├── babel.config.js          # Babel configuration
├── components.json          # UI component registry
├── global.css               # Global NativeWind/Tailwind styles
├── metro.config.js          # Metro bundler configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) on your Android/iOS device *(for development)*
- A running instance of the BatumBAKAL backend API

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/CallMeLlms/BatumBAKAL.git
cd BatumBAKAL
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up your environment**

Create a `.env` file in the project root:

```env
DEV_PHYSICAL_DEVICE_IP=http://YOUR_LOCAL_API_HOST:3000
```

> Replace `YOUR_LOCAL_API_HOST` with your machine's local IP address (e.g. `192.168.1.10`) if testing on a physical device connected to the same Wi-Fi network.

4. **Start the development server**

```bash
npm start
```

Then scan the QR code using **Expo Go** on your device, or press `a` to open on an Android emulator / `i` for an iOS simulator.

---

## 🧪 Running Tests

```bash
# Interactive watch mode
npm test

# CI-style (single run, no watch)
npx jest --runInBand --watchAll=false
```

---

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Expo development server |
| `npm run android` | Launch on Android emulator or device |
| `npm run ios` | Launch on iOS simulator or device |
| `npm run web` | Run in the browser |
| `npm test` | Run Jest in interactive watch mode |
| `npm run lint` | Lint the codebase with ESLint |
| `npm run reset-project` | Reset the project to its initial state |

---

## 🔐 Environment & Security Notes

The app reads its API base URL from the `DEV_PHYSICAL_DEVICE_IP` environment variable, which is injected at build time via `app.config.ts` using Expo's config extras system.

**Important:**
- Values passed through Expo config extras are **bundled into the app** and are not secret — do not store private API keys, signing credentials, or database secrets here.
- Local `.env` files are listed in `.gitignore` and will never be committed to the repository.
- A **GitHub Actions safety scan** runs on every push and pull request to `master`, checking for accidentally tracked `.env` files, hardcoded local IP addresses, and sensitive debug headers in source code.

---

## 🗺️ Roadmap

> This section will be updated as development progresses.

- [x] Project scaffolding and navigation setup
- [x] Authentication screens (login / register)
- [x] API integration layer with Axios
- [x] Zustand state management setup
- [x] Bottom tab navigation (Progress, Log, Profile)
- [ ] Program creation and management flow
- [ ] Workout day builder
- [ ] Live workout logging screen
- [ ] Progress charts and history visualization
- [ ] Profile editing
- [ ] Production build and release

---

## 🤝 Contributing

This is a personal development project and is not currently open to external contributions. If you spot a bug or have a suggestion, feel free to open an [Issue](https://github.com/CallMeLlms/BatumBAKAL/issues).

---

## 👨‍💻 Author

- **CallMeLlms** — [@CallMeLlms](https://github.com/CallMeLlms)

---

## 📄 License

This project is private. All rights reserved © 2026.

---

<div align="center">

Built with 💪 — one rep at a time.

</div>