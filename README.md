# BatumBAKAL Mobile

BatumBAKAL Mobile is an Expo React Native app for planning and tracking gym programs. It includes authentication screens, program creation flows, workout-day building, progress/log/profile tabs, and API integration with a backend service.

## Tech Stack

- Expo SDK 52
- React Native 0.76
- Expo Router
- TypeScript
- NativeWind / Tailwind CSS
- Zustand
- Axios
- Expo SecureStore
- Jest

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```bash
DEV_PHYSICAL_DEVICE_IP=http://YOUR_LOCAL_API_HOST:3000
```

Example for a physical device on the same Wi-Fi network:

```bash
DEV_PHYSICAL_DEVICE_IP=http://YOUR_COMPUTER_LAN_IP:3000
```

Start the Expo dev server:

```bash
npm start
```

Then open the app with Expo Go, an Android emulator, an iOS simulator, or a development build.

## Scripts

```bash
npm start       # Start Expo
npm run android # Start on Android
npm run ios     # Start on iOS
npm run web     # Start web build
npm run lint    # Run Expo lint
npm test        # Run Jest in watch mode
```

For CI-style test runs, use:

```bash
npx jest --runInBand --watchAll=false
```

## Environment Notes

The app reads its API URL from `DEV_PHYSICAL_DEVICE_IP` through `app.config.ts` and Expo config extras. Values exposed through Expo client config are public to the app bundle, so do not place secrets, private API keys, signing keys, or database credentials in this variable.

Local `.env` files are intentionally ignored by Git.

## Repository Safety

This repository includes a GitHub Actions safety scan that checks pull requests and pushes to `master` for common public-repo mistakes, including tracked env files, local-only URLs, and sensitive token/header debug logs.

## Project Status

This is an active personal learning/build project. Some screens and flows are still in progress, and the API contract may continue to evolve.
