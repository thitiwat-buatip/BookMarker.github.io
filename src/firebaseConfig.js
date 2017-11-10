import Firebase from 'firebase'

/* Firebase configuration */
let config = {
    apiKey: "AIzaSyDdT4jfE_hlNVEGyN5os7pfNwRkw4uV5TU",
    authDomain: "site-bookmarker.firebaseapp.com",
    databaseURL: "https://site-bookmarker.firebaseio.com/",
    projectId: "Site Bookmarker",
    storageBucket: "gs://site-bookmarker.appspot.com/",
    messagingSenderId: "797633048873"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export {firebaseApp, db};