import React, { Component } from 'react';
import auth from '../../services/authService';
import { Navigate,  Outlet } from 'react-router-dom';
import { withRouter } from './withRouter';
import { useLocation } from 'react-router-dom';


/* const ProtectedRoute = ({ path }) => {
    return ( 
        <Route  path ={path}
         element={auth.getCurrentUser ? <Outlet />: <Navigate replace to="/login" />}>
         </Route>
     );
} */

const ProtectedRoute = () => {
    const location = useLocation();
    return auth.getCurrentUser() ? <Outlet /> : <Navigate to="/login"
   state={{from: location}}
    />;
}

export default withRouter(ProtectedRoute);