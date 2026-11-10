import React from 'react';
import classes from './Highlight.module.css';

var xCor = 9;
var yCor = 9;

const Highlight = (props) => {
    return (
        <header
            style={{
                left: props.annotation.rect[0] + xCor,
                bottom: props.annotation.rect[1] + yCor,
                height: props.annotation.rect[3] - props.annotation.rect[1],
                width: props.annotation.rect[2] - props.annotation.rect[0]
            }}
            className={classes.Highlight}
            onClick={props.onClick}>
        </header>
    )
};

const TextHighlight = (props) => {
    return (
        <header
            style={{
                left: props.text.transform[4] + xCor,
                bottom: props.text.transform[5] + yCor,
                height: props.text.height,
                width: props.text.width,
            }}
            className={classes.TextHighlight}
            onClick={props.onClick}>
        </header>
    )
};




export { Highlight, TextHighlight }; 