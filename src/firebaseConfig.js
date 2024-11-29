import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCB4EptbORmvuN3XaXokHIzhIn6CjKUmjU",
  authDomain: "dynamic-radar-443104-u0.firebaseapp.com",
  databaseURL: "https://dynamic-radar-443104-u0-examenbd-rtdb.firebaseio.com",
  projectId: "dynamic-radar-443104-u0",
  storageBucket: "dynamic-radar-443104-u0.firebasestorage.app",
  messagingSenderId: "795920223892",
  appId: "1:795920223892:web:f13db4bce3e9c8c8b9ae81"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const firestore = getFirestore(app);
const storage  = getStorage(app);
const auth = getAuth(app)

export { firestore,auth,storage };
