import React, { Component } from 'react'


class Dropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Dropped: false,
            headerTitle: this.props.title
        }
        this.close = this.close.bind(this)
    }
}

