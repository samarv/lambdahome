import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

var app = firebase.initializeApp({
    apiKey: "AIzaSyC2CtFTamSm_frnxNAsG7PR_PXXcHSo_1g",
    authDomain: "lambdahome-ca96b.firebaseapp.com",
    databaseURL: "https://lambdahome-ca96b.firebaseio.com",
    projectId: "lambdahome-ca96b",
    storageBucket: "lambdahome-ca96b.appspot.com",
    messagingSenderId: "930250855005"
});

var db = firebase.database(app);
var base = Rebase.createClass(db);

export default base;
