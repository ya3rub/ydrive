import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth } from '../context/context';

const ProtectedRoute = () => {
    let { user, isLoading } = useUserAuth();
    if (isLoading) {
        return (
            <div className="flex justify-center h-screen">
                <span className="self-center loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
