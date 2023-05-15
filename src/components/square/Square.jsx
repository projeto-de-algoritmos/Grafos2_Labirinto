import React, { Component } from "react";

import "./Square.css";

export default class Square extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return <div className="square"></div>;
    }
}