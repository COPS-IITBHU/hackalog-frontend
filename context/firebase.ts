import firebase, { analytics, apps, initializeApp } from "firebase"

const firebaseConfig = {
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
    if (!apps.length) {
        initializeApp(firebaseConfig)
        analytics()
    }
    return firebase
}

export type userType = firebase.User | null
