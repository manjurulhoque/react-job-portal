import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobsPage from "pages/JobsPage";
import LoginPage from "pages/LoginPage";

const BaseRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/jobs" component={JobsPage} />
                <Route exact path="/jobs/:id" component={JobDetailsPage} />
                <Route exact path="/login" component={LoginPage} />
            </Switch>
        </div>
    );
};

export default BaseRouter;
