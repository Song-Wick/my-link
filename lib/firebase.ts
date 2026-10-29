import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app"
import {
  getAnalytics,
  isSupported as isAnalyticsSupported,
  type Analytics,
} from "firebase/analytics"
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Next.js SSR 및 HMR 환경에서 중복 초기화 방지 (Singleton 패턴)
export const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// PRD 명세 기반 핵심 Firebase 서비스 인스턴스
export const auth: Auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db: Firestore = getFirestore(app)
export const storage: FirebaseStorage = getStorage(app)

// Analytics는 브라우저 환경에서만 지원되므로 SSR 안전 처리
export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window === "undefined") {
    return null
  }
  const supported = await isAnalyticsSupported()
  return supported ? getAnalytics(app) : null
}

