import { createUserWithEmailAndPassword, deleteUser, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword, updateProfile } from 'firebase/auth';
import React, { useState, createContext, useEffect } from 'react';
import { auth } from '../services/firebase.init';
import axios from 'axios';


// This is what you must pass to useContext()
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    // Email & Password Register
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Email & Password Login
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if (currentUser?.email) {
            const userData = { email: currentUser.email };
            axios.post('http://localhost:3000/jwt', userData,{
                withCredentials: true
            })
                .then(res => {
                    console.log('JWT response', res.data);
                    const token = res.data.token;
                    localStorage.setItem('career-help-token', token);
                })
                .catch(err => {
                    console.error(err);
                });
        }
        setLoading(false);
        console.log('current user is', currentUser);
    });
    return () => unsubscribe();
}, []);

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };

    const deleteCurrentUser = () => {
        return deleteUser(auth.currentUser);
    };


    // Google Login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };



    // Logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    // update password
    const changeUserPassword = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword);
    };

    const authInfo = {
        user,
        logOut,
        loading,
        createUser,
        signInUser,
        googleLogin,
        updateUserProfile,
        deleteCurrentUser,
        changeUserPassword,

    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;