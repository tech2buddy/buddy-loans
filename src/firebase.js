import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { firebaseConfig as staticConfig } from './firebaseConfig'

// Prefer values from firebaseConfig.js. If placeholders are left, fall back to env vars.
const envConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseConfig = {
  apiKey: staticConfig.apiKey && staticConfig.apiKey !== 'YOUR_API_KEY' ? staticConfig.apiKey : envConfig.apiKey,
  authDomain: staticConfig.authDomain && staticConfig.authDomain !== 'YOUR_AUTH_DOMAIN' ? staticConfig.authDomain : envConfig.authDomain,
  projectId: staticConfig.projectId && staticConfig.projectId !== 'YOUR_PROJECT_ID' ? staticConfig.projectId : envConfig.projectId,
  storageBucket: staticConfig.storageBucket && staticConfig.storageBucket !== 'YOUR_STORAGE_BUCKET' ? staticConfig.storageBucket : envConfig.storageBucket,
  messagingSenderId: staticConfig.messagingSenderId && staticConfig.messagingSenderId !== 'YOUR_MESSAGING_SENDER_ID' ? staticConfig.messagingSenderId : envConfig.messagingSenderId,
  appId: staticConfig.appId && staticConfig.appId !== 'YOUR_APP_ID' ? staticConfig.appId : envConfig.appId,
}

const hasAll = Object.values(firebaseConfig).every(Boolean)
if (!hasAll) {
  console.warn('[firebase] Missing one or more Firebase env vars. The app will run in limited mode until .env is configured.')
}

let app = null
let auth = null
let db = null
let storage = null

try {
  if (hasAll) {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    db = getFirestore(app)
    storage = getStorage(app)
  }
} catch (e) {
  console.error('[firebase] Initialization failed:', e)
}

export { auth, db, storage }
export default app
export const firebaseReady = !!app
