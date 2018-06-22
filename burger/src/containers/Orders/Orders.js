import React, { Component } from 'react';
import { connect} from 'react-redux';
import * as actionsType from '../../store/actions/index';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    clicked={() => this.props.onDeleteOrder(order.id)}
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.orderReducer.loading,
        orders: state.orderReducer.orders,
        token: state.auth.token
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actionsType.fetchOrders(token)),
        onDeleteOrder: (id) => dispatch(actionsType.deleteOrder(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));