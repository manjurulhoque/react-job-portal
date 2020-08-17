import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobsPage from "pages/JobsPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import EmployerPrivateRoute from "commons/EmployerPrivateRoute";
import PostJobPage from "pages/employer/PostJobPage";
import AppliedJobsPage from "pages/employee/AppliedJobsPage";
import EmployeePrivateRoute from "commons/EmployeePrivateRoute";

const BaseRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/jobs" component={JobsPage} />
                <Route exact path="/jobs/:id" component={JobDetailsPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                {/* Employer routes */}
                <EmployerPrivateRoute exact path="/post-job" component={PostJobPage} />

                {/* Employee routes */}
                <EmployeePrivateRoute exact path="/applied-jobs" component={AppliedJobsPage} />
            </Switch>
        </div>
    );
};

export default BaseRouter;
