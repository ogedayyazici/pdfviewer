import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css';

//const handleChange = event => {
//    this.setState({
//        [event.target.name]: event.target.value,
//    })
//}

const navigationItems = () => (

    <ul className={classes.NavigationItems} >
        <NavigationItem link="/" active>PDF Viewer</NavigationItem>
    </ul>

);

export default navigationItems;