import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzwVDWU5tBNTafZKTr81KUFS5uNGFmMbI",
  authDomain: "whatsapp-e9992.firebaseapp.com",
  projectId: "whatsapp-e9992",
  storageBucket: "whatsapp-e9992.appspot.com",
  messagingSenderId: "262486906933",
  appId: "1:262486906933:web:a23530ee3f1edb5313397c",
  measurementId: "G-S3RMFY28VX"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


export { auth, provider, db};

