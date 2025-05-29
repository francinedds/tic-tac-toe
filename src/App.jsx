import React, { useState } from 'react';
import './App.css';
import imagemX from './assets/X.png';
import imagemO from './assets/O.png';
import restartImage from './assets/restart-button.png';
import closeIcon from './assets/close-button.png';
import minimizeIcon from './assets/minimize-button.png';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => {
    let img = null;
    if (squares[index] === 'X') img = <img src={imagemX} alt="X" />;
    else if (squares[index] === 'O') img = <img src={imagemO} alt="O" />;

    const isWinningSquare = winningLine.includes(index);
    const squareClass = isWinningSquare ? "square winning-square" : "square";

    return (
      <button className={squareClass} onClick={() => handleClick(index)}>
        {img}
      </button>
    );
  };

  const winnerData = calculateWinner(squares);
  const winner = winnerData?.player;
  const winningLine = winnerData?.line || [];
  const status = winner
  ? (
      <span>
        winner: {winner === 'X' ? <img src={imagemX} alt="Vencedor X" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} /> : <img src={imagemO} alt="Vencedor O" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />}
      </span>
    )
  : (
      <span>
        next: {isXNext ? <img src={imagemX} alt="X" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} /> : <img src={imagemO} alt="O" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />}
      </span>
    );

  return (
    <div className="game">
      <div className="container">
        <header className="game-header">
          <h1>tic tac toe</h1>
            <div className="icons">
              <img src={minimizeIcon} alt="minimalize" className="minimize" />
              <img src={closeIcon} alt="close" className="close" />
            </div>
        </header>

        <main className="game-main">
          <div className="status">{status}</div>

          <div className="board">
            {[0, 1, 2].map((row) => (
              <div key={row} className="board-row">
                {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
              </div>
            ))}
          </div>
        </main>
        <button onClick={() => window.location.reload()}>
          <img src={restartImage} alt="Reiniciar" className="reload-icon" title="Click to restart the game"/>
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
    [0, 4, 8], [2, 4, 6]             // diagonais
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default App;