import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandled = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandled = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to="/"/>;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutContinue={this.checkoutContinueHandled}
                        onCheckoutCancel={this.checkoutCancelHandled}/>
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        purchased: state.orderReducer.purchased
    }
};

export default connect(mapStateToProps)(Checkout);