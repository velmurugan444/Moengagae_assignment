import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

var firebaseConfig = {
  apiKey: "AIzaSyB8uD52Iz5ivjnTqZZtGWmn56fbIwZH6_w",
  authDomain: "moengageassignment-f7d13.firebaseapp.com",
  projectId: "moengageassignment-f7d13",
  storageBucket: "moengageassignment-f7d13.appspot.com",
  messagingSenderId: "253335168098",
  appId: "1:253335168098:web:47376a365114996b105d3b",
  measurementId: "G-7ZQC0QHW9P"
};
// Initialize Firebase
var fire = firebase.initializeApp(firebaseConfig);

export default fire;
