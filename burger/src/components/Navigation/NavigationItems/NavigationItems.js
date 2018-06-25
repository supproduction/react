import React from 'react';

import classes from './NavigationItems.css';
import NavItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        {!props.isAuthenticated
            ? <NavItem link="/auth">Authenticate</NavItem>
            : <React.Fragment>
                <NavItem link="/orders">Orders</NavItem>
                <NavItem link="/logout">Logout</NavItem>
              </React.Fragment>}
    </ul>
);

export default navigationItems;