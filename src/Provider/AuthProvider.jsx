import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

import { useEffect, useState } from "react";
import { app } from "../Firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const LogInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const sighInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, new GoogleAuthProvider())
    }

     const updateUser=(updateData)=>{
        return updateProfile(auth.currentUser ,updateData)
    }
    
    const signOutUser = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)

        })
        return () => {
            unSubscribe();
        }

    }, [])

    const userInfo = {
        user,
        setUser,
        createUser,
        signOutUser,
        LogInUser,
        sighInWithGoogle,
        updateUser,
        loading,
        auth

    }
   

    return (
        <AuthContext value={userInfo}>
            {children}
        </AuthContext>
    )
}

export default AuthProvider;