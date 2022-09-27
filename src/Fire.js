import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB8Wn4dk1Zd3n8bm0QtAUOPtSpARmCIFGs",
    authDomain: "chatapp-36b42.firebaseapp.com",
    projectId: "chatapp-36b42",
    storageBucket: "chatapp-36b42.appspot.com",
    messagingSenderId: "747056572615",
    appId: "1:747056572615:web:ddb38f972479a79160f6e2",
    measurementId: "G-1V540L0DLX"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);