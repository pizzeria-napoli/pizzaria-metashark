// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCPvjC50m-eIfwKN_2lPFnqqseJ4S5hpB0",
authDomain: "pizzaria-metashark.firebaseapp.com",
projectId: "pizzaria-metashark",
storageBucket: "pizzaria-metashark.firebasestorage.app",
messagingSenderId: "1099386261845",
appId: "1:1099386261845:web:bea3d9b8e7b7bf0b3c9fdc",
measurementId: "G-Q3605FGQWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
