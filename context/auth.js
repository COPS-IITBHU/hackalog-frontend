import React from 'react'
import { loadFirebase } from './firebase'
import axios from '../util/axios'
import { API_URL } from '../util/constants'

const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
  const [ firebaseUser, setFirebaseUser ] = React.useState(null)
  const [ token, setToken ] = React.useState(null)
  const [ loading, setLoading ] = React.useState(true)

  const checkAuth = async () => {
    let firebase = await loadFirebase()
    firebase.auth().onAuthStateChanged(authUser => {
      console.log("firebase user: ", authUser)
      setFirebaseUser(authUser)
      if(authUser){
        authUser.getIdToken(true)
        .then(idToken => {
          axios.post("login/", { id_token: idToken })
            .then(response => {
              console.log(response.status, response.data)
              setToken(response.data.token)
              setLoading(false)
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
    });
  }

  React.useEffect(() => {
    checkAuth()
  } ,[])

  return(
    <AuthContext.Provider value={{
      firebaseUser, setFirebaseUser, token, setToken, loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)