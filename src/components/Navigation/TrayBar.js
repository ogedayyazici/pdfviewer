import React from 'react';
import classes from './TrayBar.module.css';

const TrayBar = (props) => (
    <header className={classes.TrayBar}>
        <div style={{ backgroundColor: 'white' }}> Annotation Count: {props.textCounter}</div>
        <div style={{ backgroundColor: 'white' }}> Text Count {props.annotationCounter} </div>
        <button onClick={props.clearTrayData}>Clear</button>

    </header>
);

export default TrayBar;