import { initializeApp } from "firebase/app";
import { initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyD8fi3xhhDjEMQMyY9WGZ3UEDJm_ygT3uE",
  authDomain: "astro-sight-mobile-app.firebaseapp.com",
  projectId: "astro-sight-mobile-app",
  storageBucket: "astro-sight-mobile-app.appspot.com",
  messagingSenderId: "746255026372",
  appId: "1:746255026372:web:54b79bc4dcf58253f82191"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// export default app;
export default auth;