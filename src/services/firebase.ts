import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

let app: FirebaseApp | null = null
let auth: Auth | null = null
let provider: GoogleAuthProvider | null = null

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  provider = new GoogleAuthProvider()
} catch (error) {
  console.warn(
    'Firebase initialization failed. Missing or invalid configuration. Running in Guest mode...',
    { error }
  )
}

export { auth, provider, signInWithPopup, signOut, firebaseConfig }
