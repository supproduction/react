import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    }
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return (dispatch, getState) => {
        const deffStateIngs = getState().burgerBuilderReducer.ingredients === null;
        if (deffStateIngs) {
            axios.get('/ingredients.json')
                .then(response => {
                    dispatch(setIngredients(response.data));
                })
                .catch(error => {
                    dispatch(fetchIngredientsFailed());
                });
        }
    };
};

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    }
};

export const changeAmountIngredient = (amount, ingName) => {
    const amountValue = amount < 0 || amount === '' ? 0 : Math.ceil(amount);
    return {
        type: actionTypes.CHANGE_AMOUNT_INGREDIENT,
        ingredientName: ingName,
        ingredientAmount: amountValue
    }
};