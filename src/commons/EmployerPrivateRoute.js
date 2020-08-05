/* eslint-disable */
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';


const EmployerPrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={
                props => {
                    if (authContext.isLoading) {
                        return <h2>Loading...</h2>
                    } else if (!authContext.isAuthenticated) {
                        return <Redirect to="/login" />
                    }
                    else if (!authContext.user && authContext.user.role != 'employer') {
                        return <Redirect to="/" />
                    }
                    else {
                        return <Component {...props} />;
                    }
                }
            }
        />
    )
}

export default EmployerPrivateRoute;