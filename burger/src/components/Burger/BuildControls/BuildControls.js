import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const capitalizeFirstChar = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const buildControls = (props) => {
    const ingredients = Object.keys(props.ings);
    const controls = ingredients.map(ingredient => {
        return {
            label: capitalizeFirstChar(ingredient),
            value: props.ings[ingredient],
            type: ingredient
        }
    });
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    disabled={props.disabled[ctrl.type]}
                    key={ctrl.label}
                    value={ctrl.value}
                    changed={(e) => props.onInputChanged(e.target.value, ctrl.type)}
                    removed={() => props.ingredientRemove(ctrl.type)}
                    added={() => props.ingredientAdded(ctrl.type)}
                    label={ctrl.label}/>
            ))}
            <div className={classes.ActionsHolder}>
                <button className={classes.OrderButton}
                        disabled={!props.purchasable}
                        onClick={props.ordered}>ORDER NOW
                </button>
                <button className={classes.ResetButton}
                        disabled={!props.purchasable}
                        onClick={props.reset}>RESET ORDER
                </button>
            </div>
        </div>
    );
};

export default buildControls;