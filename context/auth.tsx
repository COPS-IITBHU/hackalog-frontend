import React from "react"
import { loadFirebase } from "./firebase"
import axios from "../util/axios"
import firebase from "firebase"
import { ProfileSerializer } from '../types/backend';
import { AxiosResponse } from "axios";

export type userType = firebase.User | null;
export type tokenType = string | null;
export type profileType = ProfileSerializer | null;
export type loadingType = boolean;

const AuthContext = React.createContext<{
    firebaseUser: userType
    setFirebaseUser: (user: userType) => void
    token: tokenType
    setToken: (token: tokenType) => void
    profile: profileType
    setProfile: (profile: profileType) => void
    loading: loadingType
    handleSignIn: () => void
    handleLogout: () => void
}>({
    firebaseUser: null,
    setFirebaseUser: (user: userType) => {},
    token: null,
    setToken: (token: tokenType) => {},
    profile: null,
    setProfile: (profile: profileType) => {},
    loading: true,
    handleSignIn: () => {},
    handleLogout: () => {},
})

export const AuthProvider: React.FC<{}> = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = React.useState<userType>(null)
    const [token, setToken] = React.useState<tokenType>(null)
    const [profile, setProfile] = React.useState<profileType>(null)
    const [loading, setLoading] = React.useState<loadingType>(true)

    const updateProfile = (token: string) => {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
        return axios.get(`profile/`)
    }

    const handleSignIn = async () => {
        var firebase = await loadFirebase()
        var provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope("email")
        provider.addScope("profile")
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(() => {
                //Notify to user by succes login
            })
            .catch((err) => {
                alert("Error Processing request, try again.")
            })
    }

    const handleLogout = async () => {
        var firebase = await loadFirebase()
        firebase
            .auth()
            .signOut()
            .then(function () {
                setFirebaseUser(null)
                setToken(null)
                setProfile(null)
                delete axios.defaults.headers.common["Authentication"]
            })
            .catch(function (err) {
                alert("Error Processing request, try again.")
            })
    }

    const checkAuth = async () => {
        setLoading(true)
        let firebase = await loadFirebase()
        firebase.auth().onAuthStateChanged((authUser) => {
            setFirebaseUser(authUser)
            if (authUser) {
                authUser
                    .getIdToken(true)
                    .then((idToken) => {
                        axios
                            .post("login/", { id_token: idToken })
                            .then((response: AxiosResponse<{token: string;}>) => {
                                let newToken: string = response.data.token;
                                updateProfile(newToken)
                                    .then((response: AxiosResponse<ProfileSerializer>) => {
                                        setToken(newToken)
                                        setProfile(response.data)
                                        setLoading(false)
                                    })
                                    .catch((error) => {
                                        setLoading(false)
                                    })
                            })
                            .catch((error) => {
                                setLoading(false)
                            })
                    })
                    .catch((error) => {
                        setLoading(false)
                    })
            } else setLoading(false)
        })
    }

    React.useEffect(() => {
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                firebaseUser,
                setFirebaseUser,
                token,
                setToken,
                profile,
                setProfile,
                loading,
                handleSignIn,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)
