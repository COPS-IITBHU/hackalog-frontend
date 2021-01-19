import React from 'react'
import { loadFirebase } from './firebase'
import axios from '../util/axios'

const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
    const [ firebaseUser, setFirebaseUser ] = React.useState(null)
    const [ token, setToken ] = React.useState(null)
    const [ profile, setProfile ] = React.useState(null)
    const [ loading, setLoading ] = React.useState(true)

    const updateProfile = (token) => {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        return axios.get(`profile/`)
    }

    const handleSignIn = async () => {
        var firebase = await loadFirebase();
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        firebase.auth().signInWithPopup(provider)
            .then(() => {
                console.log("firebase login success")
            })
            .catch(err => {
                alert('Error Processing request, try again.');
                console.log(err);
            });
    }

    const handleLogout = async () => {
        var firebase = await loadFirebase();
        firebase.auth().signOut().then(function () {
            setFirebaseUser(null)
            setToken(null)
            setProfile(null)
            delete axios.defaults.headers.common['Authentication']
        }).catch(function (err) {
            alert('Error Processing request, try again.');
            console.log(err);
        });
    }

    const checkAuth = async () => {
        setLoading(true)
        let firebase = await loadFirebase()
        firebase.auth().onAuthStateChanged(authUser => {
            console.log("firebase user: ", authUser)
            setFirebaseUser(authUser)
            if (authUser) {
                authUser.getIdToken(true)
                    .then(idToken => {
                        axios.post("login/", { id_token: idToken })
                            .then(response => {
                                console.log(response.status, response.data)
                                let newToken = response.data.token
                                updateProfile(newToken)
                                    .then(response => {
                                        console.log("Profile Response: ", response.data)
                                        setToken(newToken)
                                        setProfile(response.data)
                                        setLoading(false)
                                    }).catch(error => {
                                        setLoading(false)
                                        console.log(error)
                                    })
                            })
                            .catch(error => {
                                console.log(error)
                                console.log(error.response)
                                setLoading(false)
                            })
                    })
                    .catch(error => {
                        console.log(error)
                        setLoading(false)
                    });
            }
            else setLoading(false)
        });
    }

    React.useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{
            firebaseUser, setFirebaseUser, token, setToken, profile, setProfile, loading, handleSignIn, handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)