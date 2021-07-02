/* eslint-disable */
import React, { FC, useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


const EmployeePrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await authContext.user;
            
    //         console.log(result);
    //     };
    //     fetchData();
    // }, []);

    return (
        <Route
            {...rest}
            render={
                props => {
                    if (authContext.state.isLoading) {
                        return <h2>Loading...</h2>
                    } else if (!authContext.state.isAuthenticated) {
                        return <Redirect to="/login" />
                    }
                    else if (!authContext.state.user || authContext.state.user.role !== 'employee') {
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

export default EmployeePrivateRoute;