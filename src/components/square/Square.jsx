import React, { Component } from "react";

import "./Square.css";

export default class Square extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        const {isStart, isFinish} = this.props;
        const extraClassName = isFinish ? "square-finish" : isStart ? "square-start" : "";
        return <div className={`square ${extraClassName}`}></div>;
    }
}