import React, { Component } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export const NavigateButton = ({buttonTitle, route, isReplaced}) => {
    const navigate = useNavigate();
    return ( 
        <button 
            onClick={() => {
                navigate(route, {replace: isReplaced})
            }}
            className="btn btn-primary mb-3">
            {buttonTitle}
                    </button>
     );
}

export const withRouter = (Component) => {

     const ComponentWithRouterProp = (props)  => {
        const params = useParams();
        const navigate = useNavigate();
        const location = useLocation();
        
        return <Component
                {... props}
                router = {{location, navigate, params}} />
    }
    return ComponentWithRouterProp ;
}
 