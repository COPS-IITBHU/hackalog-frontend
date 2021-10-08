import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react"
import { loadFirebase, userType } from "./firebase"
import axios from "../util/axios"
import { ProfileSerializer } from "@/types/backend"

type tokenType = string | null
type profileType = ProfileSerializer | null
type loadingType = boolean
type PropTypes = PropsWithChildren<{}>

const AuthContext = createContext<{
    handleLogout: () => void
    handleSignIn: () => void
    setFirebaseUser: React.Dispatch<React.SetStateAction<userType>>
    setProfile: React.Dispatch<React.SetStateAction<profileType>>
    setToken: React.Dispatch<React.SetStateAction<tokenType>>
    firebaseUser: userType
    loading: loadingType
    profile: profileType
    token: tokenType
}>({
    handleLogout: () => {},
    handleSignIn: () => {},
    setFirebaseUser: () => {},
    setProfile: () => {},
    setToken: () => {},
    firebaseUser: null,
    loading: false,
    profile: null,
    token: null,
})

export const AuthProvider = ({ children }: PropTypes) => {
    const [firebaseUser, setFirebaseUser] = useState<userType>(null)
    const [token, setToken] = useState<tokenType>(null)
    const [profile, setProfile] = useState<profileType>(null)
    const [loading, setLoading] = useState<loadingType>(false)

    const updateProfile = (token: string) => {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
        axios
            .get<profileType>(`profile/`)
            .then((response) => {
                setToken(token)
                setProfile(response.data)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const handleSignIn = async () => {
        let firebase = await loadFirebase()
        let provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope("email")
        provider.addScope("profile")
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(() => {
                //Notify to user by success login
            })
            .catch(() => {
                alert("Error Processing request, try again.")
            })
    }

    const handleLogout = async () => {
        let firebase = await loadFirebase()
        firebase
            .auth()
            .signOut()
            .then(function () {
                setFirebaseUser(null)
                setToken(null)
                setProfile(null)
                delete axios.defaults.headers.common["Authentication"]
            })
            .catch(function () {
                alert("Error Processing request, try again.")
            })
    }

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            let firebase = await loadFirebase()
            firebase.auth().onAuthStateChanged((authUser) => {
                setFirebaseUser(authUser)
                if (authUser) {
                    authUser
                        .getIdToken(true)
                        .then((idToken) => {
                            axios
                                .post<{ token: string }>("login/", {
                                    id_token: idToken,
                                })
                                .then((response) => {
                                    let newToken: string = response.data.token
                                    updateProfile(newToken)
                                })
                                .catch(() => {
                                    setLoading(false)
                                })
                        })
                        .catch(() => {
                            setLoading(false)
                        })
                } else setLoading(false)
            })
        })()
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

export const useAuth = () => useContext(AuthContext)
