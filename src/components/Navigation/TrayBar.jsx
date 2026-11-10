import React from 'react';
import classes from './TrayBar.module.css';

const TrayBar = (props) => (
    <header className={classes.TrayBar}>
        <pre style={{ backgroundColor: 'white' }}> Annotation Count: {props.textCounter}</pre>
        <pre style={{ backgroundColor: 'white' }}> Text Count {props.annotationCounter} </pre>
        <button onClick={props.clearTrayData}>Clear</button>

    </header>
);

export default TrayBar;