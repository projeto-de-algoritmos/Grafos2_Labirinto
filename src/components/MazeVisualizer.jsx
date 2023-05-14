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
        for (let row = 0; row < 15; row++) {
            const currentRow = [];
            for (let col = 0; col < 40; col++) {
                currentRow.push([]);
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
                foo abr
                <button onClick={() => this.tableMount()}>Mount</button>
                <div className="grid">
                    {squares.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((square, squareIdx) => (
                                    <Square key={squareIdx} />
                                ))}
                            </div>
                        );
                    })}
            </div>
            </div>);
    }
}