import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCTDtBPyoakj_Oklqg1gn3Y3pkfAkX3VKU",
  authDomain: "blog-app-2dec8.firebaseapp.com",
  projectId: "blog-app-2dec8",
  storageBucket: "blog-app-2dec8.appspot.com",
  messagingSenderId: "86280703163",
  appId: "1:86280703163:web:63e10d6d4568ab065fad9e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
