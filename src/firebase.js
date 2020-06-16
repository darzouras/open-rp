import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import store from './store'


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
var firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
store.dispatch("fetchUser", user);
});

firebase.getCurrentUser = () => {
return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
    }, reject);
})
};

export const db = firebaseApp.firestore();
export default firebase;