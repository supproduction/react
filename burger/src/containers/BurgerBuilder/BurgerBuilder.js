import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './BurgerBuilder.css';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onIngredientsInit()
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Aux>
                    <div className={classes.BurgerOverlay}>
                        <Burger ingredients={this.props.ings}/>
                    </div>
                    <BuildControls
                        ings={this.props.ings}
                        price={this.props.prise}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        disabled={disabledInfo}
                        ordered={this.purchaseHandler}
                        reset={this.props.onIngredientsReset}
                        onInputChanged={this.props.onIngredientChangedAmount}
                        ingredientRemove={this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}/>
                </Aux>
            );

            orderSummary = <OrderSummary
                price={this.props.prise}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCanceled={this.purchaseCancelHandler}
                ingredients={this.props.ings}/>;
        }

        return (
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        prise: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onIngredientsReset: () => dispatch(actions.resetIngredients()),
        onIngredientsInit: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onIngredientChangedAmount: (amount, ingName) => dispatch(actions.changeAmountIngredient(amount, ingName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));