import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'





const Privateroute =() => {
  
        let currentUser;
        let data = localStorage.getItem("authToken");
        if(data == null) {
            currentUser = false;
        } else {
            currentUser = true;
        }
    


    
    return currentUser ? <Outlet /> : <Navigate to='/' />;
}

export default Privateroute