import React, { Component } from "react";

import "./Square.css";

export default class Square extends Component{

    render(){
        const {row, col,wall} = this.props;

        const {isStart, isFinish,isVisited} = this.props;
        const extraClassName = isFinish 
            ? "square-finish" 
            : isStart 
            ? "square-start"
            : isVisited
            ? "square-visited" 
            : "" ;
        return <div id={`square-${row}-${col}`} className={`square ${extraClassName}`}></div>;
    }
}