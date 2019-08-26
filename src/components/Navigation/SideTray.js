import React from 'react';
import classes from './SideTray.module.css';

const SideTray = (props) => {
    console.log(props.annotation)
    return (

        <header className={classes.SideTray}>

            <ul>
                <div style={{ display: "flex" }}>
                    <button style={{ marginLeft: "auto" }} onClick={props.renderTrayHandler}>Clear</button>
                </div>

                <pre>ID: {props.annotation.id}</pre>
                <pre>Alternative Text: {props.annotation.alternativeText}</pre>
                <pre>Field Name: {props.annotation.fieldName}</pre>
                <pre>Subtype: {props.annotation.subtype}</pre>
            </ul>
        </header >)
};

export default SideTray;