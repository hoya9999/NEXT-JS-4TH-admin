import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase-credentials.json";

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;