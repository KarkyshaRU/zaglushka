import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBd2-RdsXOruT7jHGj4L1Fhec42DdPy_ho",
  authDomain: "kind-hands.firebaseapp.com",
  projectId: "kind-hands",
  storageBucket: "kind-hands.appspot.com",
  messagingSenderId: "541864235574",
  appId: "1:541864235574:web:4b61a65b1a39ffea4e7e97",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// console.log(firebase.analytics().logEvent());
export default firebase;
