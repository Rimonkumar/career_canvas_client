import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); 
    const location = useLocation();
    console.log(location.pathname);

    if (loading) {
        return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (user) {
        return children;
    }

    // Redirect to login, but save the current location so we can go back after login
    return <Navigate to="/signin" state={location.pathname} replace />;
};

export default PrivateRoute;