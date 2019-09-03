import React from 'react';
import classes from './Grid.module.css';

const Grid = (props) => {
    return (
        <hr className={classes.Grid}
            style={{
                left: 0,
                top: props.top,
                height: 1,
                width: 613,
            }}
        />
    )
};

const VertGrid = (props) => {
    return (
        <hr className={classes.Grid}
            style={{
                left: props.left,
                top: 0,
                height: 859,
                width: 1,
            }}
        />
    )
};


export { Grid, VertGrid }; 