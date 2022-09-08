// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7uO49gc3CXC6iqKyrDcgxTNE7ZdtQpF0",
    authDomain: "shopping-cart-d310d.firebaseapp.com",
    databaseURL: "https://shopping-cart-d310d-default-rtdb.firebaseio.com",
    projectId: "shopping-cart-d310d",
    storageBucket: "shopping-cart-d310d.appspot.com",
    messagingSenderId: "37640527488",
    appId: "1:37640527488:web:cae85196b6615c26245065",
    measurementId: "G-BYVXVJEY68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export { db, registerWithEmailAndPassword };