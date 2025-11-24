import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LoginCheck = () => {
    let loggedInUser = useSelector(store=>store.userStore);
  return (
    loggedInUser.name ? <Outlet /> : <Navigate to="/login" />
  )
}

export default LoginCheck