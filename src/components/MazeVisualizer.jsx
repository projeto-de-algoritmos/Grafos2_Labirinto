import React, {Component} from "react";
import Square from "./square/Square";


import {dijkstra, getNodesInShortestPathOrder} from "../algorith/dijkstra";


import './MazeVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;


export default class MazeVisualizer extends Component {
    constructor(props) {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
        };
    }
    


    // tableMount() {
    //     const squares = []; // 2d array
    //     for (let row = 0; row < 20; row++) {
    //         const currentRow = [];
    //         for (let col = 0; col < 40; col++) {
    //             const currentSquare = {
    //                 col,
    //                 row,
    //                 isStart: row === 10 && col === 5,
    //                 isFinish: row === 10 && col === 35,
    //             };
    //             currentRow.push(currentSquare);
    //         }
    //         squares.push(currentRow);
    //     }
    //     this.setState({squares});
    // }

    componentDidMount() {
        const grid = getInitialGrid(); // 2d array
        this.setState({grid});
    }

 

    handleMouseEnter(row,col){
      if (!this.state.mouseIsPressed) return;
      console.log(row,col);
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid});
    }

    handleMouseDown(row,col){
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});
    }

    handleMouseUp(){
      this.setState({mouseIsPressed: false});
    }

    

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length - 1) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 2 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`square-${node.row}-${node.col}`).className =
              'square square-visited';
          }, 2 * i);
        }
      }
      
      animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`square-${node.row}-${node.col}`).className =
              'square square-shortest-path';
          }, 20 * i);
        }
      }
    
      visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      }



    render() {
        const {grid,mouseIsPressed} = this.state;

        return (
            <div>
                <div className="styled-button" onClick={() => this.visualizeDijkstra()}>
                    Dijkstra
                  {/* <button onClick={() => this.visualizeDijkstra()}>
                      Visualize Dijkstra's Algorithm
                  </button> */}
                </div>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((square, squareIdx) => {
                                    const {row, col, isFinish, isStart, isWall} = square;
                                    return (
                                        <Square
                                            key={squareIdx}
                                            col={col}
                                            mouseIsPressed={mouseIsPressed}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            row={row}
                                            onMouseDown={(row,col) => this.handleMouseDown(row,col)}
                                            onMouseUp={() => this.handleMouseUp()}

                                            onMouseEnter={(row,col) => this.handleMouseEnter(row,col)}
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

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  };
  
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  
  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const square = newGrid[row][col];
    const newNode = {
      ...square,
      isWall: !square.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };