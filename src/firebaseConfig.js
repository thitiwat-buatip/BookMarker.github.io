import Firebase from 'firebase'

/* Firebase configuration */
let config = {
    apiKey: "AIzaSyDa3UcGoeGYkMteBgtI5-mgAhDLXz55M_M",
    authDomain: "vue405-a7dee.firebaseapp.com",
    databaseURL: "https://vue405-a7dee.firebaseio.com",
    projectId: "vue405-a7dee",
    storageBucket: "vue405-a7dee.appspot.com",
    messagingSenderId: "716118010988"
};

const firebaseApp = Firebase.initializeApp(config);
const db = firebaseApp.database();

export {firebaseApp, db};