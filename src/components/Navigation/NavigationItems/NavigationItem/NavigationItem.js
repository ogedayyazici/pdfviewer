import React from 'react';

const navigationItems = (props) => (

    <h1 href={props.link}
        style={{ color: "#9b4dca" }}>
        {props.children}</h1>
);

export default navigationItems;