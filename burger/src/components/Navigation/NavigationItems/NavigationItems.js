import React from 'react';

import classes from './NavigationItems.css';
import NavItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
        <NavItem link="/auth">Authenticate</NavItem>
    </ul>
);

export default navigationItems;