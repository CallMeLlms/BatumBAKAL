
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",  // Add this: Scans all files in app/ (e.g., signIn.tsx, _layout.tsx)
    "./components/**/*.{js,jsx,ts,tsx}",  // Keep existing
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}