import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContext } from '../../App';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const [userLoggedInfo, setUserLoggedInfo] = useContext(userContext);
    let location = useLocation();
    if (!userLoggedInfo.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;