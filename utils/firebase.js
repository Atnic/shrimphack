import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGH7f3yphBi3NInLcDTyX4NNUfvMZD-vE",
  authDomain: "shrimphack-2023.firebaseapp.com",
  projectId: "shrimphack-2023",
  storageBucket: "shrimphack-2023.appspot.com",
  messagingSenderId: "247070530768",
  appId: "1:247070530768:web:7d65e1fada54e4a59112d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
