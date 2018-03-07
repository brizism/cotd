import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDg58-bBp2HLhtviBhAvIOeE9lV9Mf2cTc",
    authDomain: "cotd-3f22f.firebaseapp.com",
    databaseURL: "https://cotd-3f22f.firebaseio.com"
});


const base = Rebase.createClass(firebaseApp.database()); // database() is the func that will return our db


export { firebaseApp };  // named export

export default base;  // default export 