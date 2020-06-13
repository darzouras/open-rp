import * as firebase from 'firebase/app';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCGcVHjRiLlOU-bU3e7HQT-0K14fg321n8",
    authDomain: "open-rp.firebaseapp.com",
    databaseURL: "https://open-rp.firebaseio.com",
    projectId: "open-rp",
    storageBucket: "open-rp.appspot.com",
    messagingSenderId: "978145205579",
    appId: "1:978145205579:web:dad546216f25386ce21cce",
    measurementId: "G-J6YKYRKYWY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default {
    auth: firebase.auth()
}
