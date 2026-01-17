import React, { useContext } from 'react'
import AuthContext from './pages/AuthContextPage'
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminRoute() {

    const {currentUser, loading} = useContext(AuthContext);

    if(loading) return null;

    if(!currentUser || currentUser.role !== 'ADMIN') {
        return <Navigate to="/" replace />
    }
  return <Outlet></Outlet>

}
