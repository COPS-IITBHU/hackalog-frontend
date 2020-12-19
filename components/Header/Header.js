import { Button } from "atomize";
import { useAuth } from "../../context/auth";
import { loadFirebase } from "../../context/firebase";
import axiosInstance from "../../util/axios";

export default function Header() {
    const { setFirebaseUser, token, setToken } = useAuth()
    const handleSignIn = async () => {
        var firebase = await loadFirebase();
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        firebase.auth().signInWithPopup(provider)
            .then(() => {
                console.log("login success")
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
            delete axiosInstance.defaults.headers.common['Authentication']
        }).catch(function (err) {
            alert('Error Processing request, try again.');
            console.log(err);
        });
    }
    return (
        <div className="position-fixed w-100 bg-white" style={{ zIndex: "10" }}>
            <div className="d-flex align-items-center justify-content-between w-100 p-3">
                <div>
                    <div className="font-weight-bold">
                        COPS <span className="text-monospace">Hackalog</span>
                    </div>
                </div>
                <div>
                    <div className="d-flex align-items-center">
                        <div className="p-2">
                            <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem">
                                Hackathons
                            </Button>
                        </div>
                        {token ?
                            <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem" onClick={() => handleLogout()}>
                                Logout
                            </Button>
                            :
                            <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem" onClick={() => handleSignIn()}>
                                Login with Google
                            </Button>
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`

            `}</style>
        </div>
    )
}