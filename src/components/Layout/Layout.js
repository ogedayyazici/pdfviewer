import React from 'react';
import Wrap from '../../hoc/Wrap';
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Wrap>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Wrap>
);

export default layout;