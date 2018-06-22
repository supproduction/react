import React from 'react';

import classes from './Order.css';
import Burger from '../../components/Burger/Burger';

const order = (props) => {
    const ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        })
    }

    const ingOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount}) </span>
    });

    return (
        <div className={classes.Order}>
            <button className={classes.Cross} onClick={props.clicked}>x</button>
            <p>Ingredients: {ingOutput}</p>
            <div className={classes.BurgerOverlay}>
                <Burger ingredients={props.ingredients} />
            </div>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;