import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCORJ3Z2_1EMwh0DycuRBRsHri-tqA3gKE",
    authDomain: "hackl-566af.firebaseapp.com",
    projectId: "hackl-566af",
    storageBucket: "hackl-566af.firebasestorage.app",
    messagingSenderId: "23284448937",
    appId: "1:23284448937:web:8092d31e7b0f5902c0f3b8"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);