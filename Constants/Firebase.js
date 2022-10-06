import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyBpmX_Ke7VSU_tEFVhXouHWXgCEer_gVFE",
  authDomain: "lili-9fb6d.firebaseapp.com",
  databaseURL: "https://lili-9fb6d-default-rtdb.firebaseio.com",
  projectId: "lili-9fb6d",
  storageBucket: "lili-9fb6d.appspot.com",
  messagingSenderId: "694823292167",
  appId: "1:694823292167:web:b03cf7e9d92001b5ee49a2",
  measurementId: "G-SN6EQFF5K1"
}
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export default firebase;