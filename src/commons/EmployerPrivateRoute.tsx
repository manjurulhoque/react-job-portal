/* eslint-disable */
import React, { FC, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface Props {
    component: React.ElementType
}

const EmployerPrivateRoute: FC<any> = ({component: Component, ...rest}) => {
    const authContext = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={
                props => {
                    if (authContext.state.isLoading) {
                        return <h2>Loading...</h2>
                    } else if (!authContext.state.isAuthenticated) {
                        return <Redirect to="/login"/>
                    } else if (!authContext.state.user || authContext.state.user.role != 'employer') {
                        return <Redirect to="/"/>
                    } else {
                        return <Component {...props} />;
                    }
                }
            }
        />
    )
}

export default EmployerPrivateRoute;