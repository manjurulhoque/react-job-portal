import React from 'react';
import { withRouter } from 'react-router-dom';

const NavActiveLink = (props: any) => {
    // let cuurentLocation = history.location.pathname;
    // let isActive = this.context.router.isActive(this.props.to, true);
    // let className = isActive ? "active" : "";

    return (
        <li className="nav-item">
            {props.children}
        </li>
    )
}

export default withRouter(NavActiveLink);