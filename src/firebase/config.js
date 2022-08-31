import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_DATABASE_URL,
  storageBucket: process.env.REACT_APP_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_STORAGE_BUCKET,
  appId: process.env.REACT_APP_APP_ID,
}

// Init firebase
const app = initializeApp(firebaseConfig)

// init service
const appFirestore = getFirestore(app)
const appAuth = getAuth(app)
const appStorage = getStorage(app)

// timestamp
const timestamp = appFirestore.timestamp

export { appFirestore, appAuth, appStorage, timestamp }
