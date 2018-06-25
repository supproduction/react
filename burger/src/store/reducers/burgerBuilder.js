import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

let defaultIngredients = null;
const defaultPrice = 4;
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const initialState = {
    ingredients: null,
    totalPrice: defaultPrice,
    error: false,
    built: false
};

// FUNCTIONS
const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
        built: true
    };
    return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        built: true,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
    };
};

const changeAmountIngredient = (state, action) => {
    const newPrice = Object.keys(state.ingredients).reduce((accumulator, currentValue) => {
        let multiplier = null;
        if (currentValue === action.ingredientName) {
            multiplier = INGREDIENTS_PRICE[currentValue] * action.ingredientAmount;
        } else {
            multiplier = INGREDIENTS_PRICE[currentValue] * state.ingredients[currentValue]
        }
        return accumulator + multiplier;
    }, defaultPrice);
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: action.ingredientAmount
        },
        totalPrice: newPrice
    };
};

const setIngredients = (state, action) => {
    defaultIngredients = {...action.ingredients};
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: defaultPrice,
        built: false,
        error: false
    };
};

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: true
    };
};

const resetIngredients = (state, action) => {
    return {
        ...state,
        totalPrice: defaultPrice,
        ingredients: defaultIngredients
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.CHANGE_AMOUNT_INGREDIENT: return changeAmountIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        case actionTypes.RESET_INGREDIENTS: return resetIngredients(state, action);
        default: return state;
    }
};

export default reducer;