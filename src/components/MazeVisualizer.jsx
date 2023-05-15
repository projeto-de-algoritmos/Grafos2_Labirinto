import React, {Component} from "react";
import Square from "./square/Square";

import './MazeVisualizer.css';

export default class MazeVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: [],
        };
    }

    tableMount() {
        const squares = []; // 2d array
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 40; col++) {
                const currentSquare = {
                    col,
                    row,
                    isStart: row === 10 && col === 5,
                    isFinish: row === 10 && col === 35,
                };
                currentRow.push(currentSquare);
            }
            squares.push(currentRow);
        }
        this.setState({squares});
    }



    render() {
        const {squares} = this.state;
        console.log(squares)

        return (
            <div>
                <button onClick={() => this.tableMount()}>Display Grid</button>
                <div className="grid">
                    {squares.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((square, squareIdx) => {
                                    const {row, col, isFinish, isStart} = square;
                                    return (
                                        <Square
                                            key={squareIdx}
                                            col={col}
                                            row={row}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                        ></Square>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>);
    }
}