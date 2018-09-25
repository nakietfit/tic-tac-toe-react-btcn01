import React, { Component } from 'react';
import Square from './Square'

class Board extends Component {
    renderSquare(i) {
        var squareClass = null
        const threeSquares = this.props.threeSquares
        if (threeSquares) {
            for (let index = 0; index < threeSquares.length; index++) {
                if (i === threeSquares[index]) {
                    squareClass = 'highlight'
                    break
                }
            }
        }

        return (
            <Square
                key={i}
                squareClass={squareClass}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderBoard() {
        let board = []
        for (let i = 0; i < 9; i += 3) {
            let boardRow = []
            for (let j = 0; j < 3; j++) {
                boardRow.push(this.renderSquare(i + j))
            }
            board.push(<div key={i} className="board-row">{boardRow}</div>)
        }
        return board
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

export default Board;
