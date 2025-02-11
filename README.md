# Personal Calendar

## Overview

Personal Calendar is a React + TypeScript application built with Vite, allowing users to add event reminders to a calendar. Reminders are stored in **localStorage** if the user is not logged in, and in **Firebase Firestore** if authenticated via Google.

## Check it Online

## Tech Stack

- **Framework:** React + TypeScript + Vite
- **State Management:** Jotai
- **Styling:** MUI + CSS
- **Date Library:** date-fns
- **Authentication & Database:** Firebase (Google OAuth & Firestore)
- **Testing:** Vitest & Cypress

## Setup Project

### 1. Create a `.env` file with the following variables:

```env
VITE_WEATHER_API_KEY= # Your Visual Crossing API Key
VITE_GEMINI_API_KEY= # Your Google Gemini API Key

# FIREBASE
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### 2. Missing API Key Behavior

The project can run without some API keys, but some features will be disabled:

- **No Weather API Key** → Weather forecast for events will not be available.
- **No Gemini API Key** → City name autocomplete suggestions will not work.
- **No Firebase Config** → The app will run in **Guest Mode**, storing all data in `localStorage` instead of Firebase.

## Running the Project

```sh
npm i
npm run dev
```

## Running Tests

```sh
npm run test     # Runs unit tests with Vitest
npm run cy:open  # Opens Cypress for end-to-end testing
```

## Utilities

### Generate a New Component

You can scaffold a new component using Plop:

```sh
npm run plop
```

Follow the CLI instructions to generate a new component template.
