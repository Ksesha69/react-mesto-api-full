import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({
    loggedIn,
    children,
}) => {
    if (!loggedIn) {
    return <Navigate to="/login" />;
    }

    return children
}

export default ProtectedRoute;