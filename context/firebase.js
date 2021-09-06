import firebase from "firebase/app"
import "firebase/auth"
import "firebase/analytics"
// import 'firebase/firestore'
// import 'firebase/database'
// import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBtYUl9ALa59RcR09bPptI7hj-JxExTaEg",
    authDomain: "cops-hackalog.firebaseapp.com",
    databaseURL: "https://cops-hackalog.firebaseio.com",
    projectId: "cops-hackalog",
    storageBucket: "cops-hackalog.appspot.com",
    messagingSenderId: "863587110167",
    appId: "1:863587110167:web:0975799d4456d7051f3b52",
    measurementId: "G-7MMT1MSTQQ",
}

export const loadFirebase = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
        firebase.analytics()
    }
    return firebase
}

export const getIdToken = async () => {
    let firebase = loadFirebase()
    return new Promise((resolve) => {
        firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((idToken) => {
                resolve(idToken)
            })
            .catch((err) => {
                resolve(null)
            })
    })
}
