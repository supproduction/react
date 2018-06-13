import React from 'react';

import classes from './NavigationItems.css';
import NavItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavItem link="/" active={true}>Burger Builder</NavItem>
    <NavItem link="/">Checkout</NavItem>
  </ul>
);

export default navigationItems;