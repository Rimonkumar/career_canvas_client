import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, createContext, useEffect } from 'react';
import { auth } from '../services/firebase.init';

// This is what you must pass to useContext()
export const AuthContext = createContext(null);

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
      console.log('current user is',currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);



    const logOut = () => {
        setUser(null);
    };

    const authInfo = {
        user,
        logOut,
        createUser,
        signInUser,
        
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;