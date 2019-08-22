import React from 'react';
import classes from './Highlight.module.css';

var xCor = 0;
var yCor = 0;

const Highlight = (props) => {
    console.log(props.annotation)
    return (
        <header
            style={{
                left: props.annotation.rect[0] + xCor,
                bottom: props.annotation.rect[1] - yCor,
                height: props.annotation.rect[3] - props.annotation.rect[1],
                width: props.annotation.rect[2] - props.annotation.rect[0]
            }}
            className={classes.Highlight}>
        </header>
    )
};




export default Highlight;