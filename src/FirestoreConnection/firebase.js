/* Libraries Imported */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth" // New import
import "firebase/auth";
import { getFirestore} from '@firebase/firestore';
/* connect application to Firebase database */
const firebaseConfig = {
  apiKey: "AIzaSyByTbxMpb6JYVqf3Aokgyypa-l5HfhX4d0",
  authDomain: "qqqq-91400.firebaseapp.com",
  databaseURL: "https://qqqq-91400.firebaseio.com",
  projectId: "qqqq-91400",
  storageBucket: "qqqq-91400.appspot.com",
  messagingSenderId: "944052236453",
  appId: "1:944052236453:web:226d0e61a993afa8ab5d4c",
  measurementId: "G-ZP12YQJT9M"
};
/* Set variables*/
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

