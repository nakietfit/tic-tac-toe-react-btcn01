import React, { Component } from 'react';
import Board from './Board'

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                threeSquares: [a, b, c],
                player: squares[a]
            };
        }
    }
    return null;
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                col: -1,
                row: -1
            }],
            focusBtn: -1,
            isAscending: true,
            stepNumber: 0,
            xIsNext: true
        };
    }
    
    handleClick(i) {
        let history
        if (!this.state.isAscending) {
            history = this.state.history.slice();
            history = history.reverse()
            history = history.slice(0, this.state.stepNumber + 1);
        } else {
            history = this.state.history.slice(0, this.state.stepNumber + 1);  
        }

        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        
        if (!this.state.isAscending) {
            this.setState({
                history: history.concat([{
                    squares: squares,
                    col: i % 3,
                    row: Math.floor(i / 3)
                }]).reverse(),
                focusBtn: -1,
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext
            });
        } else {
            this.setState({
                history: history.concat([{
                    squares: squares,
                    col: i % 3,
                    row: Math.floor(i / 3)
                }]),
                focusBtn: -1,
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext
            });
        }
    }

    jumpTo(step) {
        this.setState({
            focusBtn: step,
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    toggleClick() {
        this.setState({
            isAscending: !this.state.isAscending,
            history: this.state.history.reverse(),
            focusBtn: this.state.focusBtn === -1 ?
                this.state.focusBtn :
                this.state.stepNumber
        })
    }

    render() {
        const history = this.state.history;
        const stepNumber = this.state.isAscending ? 
            this.state.stepNumber : 
            this.state.history.length - this.state.stepNumber - 1
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);
        
        const moves = history.map((step, move) => {
            if (!this.state.isAscending) {
                move = history.length - move - 1
            }
            const desc = step.col !== -1 ?
                'Go to move #' + move + ' (' + step.col + ', ' + step.row + ')' :
                'Go to game start';
            const btnClass = this.state.focusBtn === move ? 'btn-focus' : null
            return (
                <li key={move}>
                    <button
                        className={btnClass}
                        onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner.player;
        } else if (this.state.stepNumber === 9) {
            status = 'Draw'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        threeSquares={winner ? winner.threeSquares : null}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)} 
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.toggleClick()}>
                        {this.state.isAscending ? 'Ascending' : 'Descending '}
                    </button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
