import React from 'react';

import classes from './BuildControl.css';
import Input from '../../../UI/Input/Input';

const buildControl = ({label, added, removed, disabled, changed, value}) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{label}</div>
        <div className={classes.InputOverlay}>
                <Input elementType='input'
                       elementConfig={{type: 'number'}}
                       changed={changed}
                       value={value === 0 ? 0 : value.toString().replace(/^0+/, '')}/>
        </div>
        <button
            className={classes.Less}
            onClick={removed}
            disabled={disabled}>Less
        </button>
        <button className={classes.More}
                onClick={added}>More
        </button>
    </div>
);

export default buildControl;