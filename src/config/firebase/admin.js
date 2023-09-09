import { initializeApp, getApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let app;

// Avoid https://github.com/firebase/firebase-admin-node/issues/2111
//
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_ENABLE === "true") {
  app = getApps().length === 0 ? initializeApp() : getApp();
} else {
  // This does not work in emulator as seems next.js hot reloads file
  app = initializeApp();
}

export const auth = getAuth(app);
export const fs = getFirestore(app);
