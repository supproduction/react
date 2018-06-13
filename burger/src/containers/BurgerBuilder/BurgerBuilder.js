import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0})
  }

  addIngridientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCounted;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngridientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {...this.state.ingredients};
    updatedIngredients[type] = updatedCounted;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'John Doe',
        address: {
          street: 'Teststreet 1',
          zipCode: '41351',
          country: 'Germany'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'faster'
    };
    axios.post('/orders', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false, purchasing: false});
      });
  }

  render () {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = <OrderSummary
        price={this.state.totalPrice}
        purchaseContinue={this.purchaseContinueHandler}
        purchaseCanceled={this.purchaseCancelHandler}
        ingredients={this.state.ingredients} />;
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          disabled={disabledInfo}
          ordered={this.purchaseHandler}
          ingredientRemove={this.removeIngridientHandler}
          ingredientAdded={this.addIngridientHandler} />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);