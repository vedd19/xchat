// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCpRzE5qy2rZNA4dDlGZ1MAjmWhUKIgsXQ",
    authDomain: "xchat-cac8c.firebaseapp.com",
    projectId: "xchat-cac8c",
    storageBucket: "xchat-cac8c.firebasestorage.app",
    messagingSenderId: "1095750808614",
    appId: "1:1095750808614:web:08e880b4dfe449582e62e7",
    measurementId: "G-RCF8X19KSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);