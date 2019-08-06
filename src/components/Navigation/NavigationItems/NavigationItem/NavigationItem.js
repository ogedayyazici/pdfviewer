import React from 'react';

const navigationItems = (props) => (
    <li>
        <a
            href={props.link}>
            {props.children}</a>
    </li>
);

export default navigationItems;