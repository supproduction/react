import React, { Component } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSide: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSide: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSide: !prevState.showSide}
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer closed={this.sideDrawerClosedHandler}
                            isAuth={this.props.isAuthenticated}
                            open={this.state.showSide}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);