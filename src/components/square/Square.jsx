import React, { Component } from "react";

import "./Square.css";

export default class Square extends Component{

    render(){
        const {row, col,isWall,onMouseEnter,onMouseDown,onMouseUp} = this.props;

        const {isStart, isFinish,isVisited} = this.props;
        const extraClassName = isFinish 
            ? "square-finish" 
            : isStart 
            ? "square-start"
            : isWall
            ? "square-wall" 
            : "" ;
        return <div id={`square-${row}-${col}`} className={`square ${extraClassName}`} onMouseEnter={() => onMouseEnter(row,col)}
                    onMouseDown={() => onMouseDown(row,col)} onMouseUp={() => onMouseUp(row,col)}></div>;
    }
}