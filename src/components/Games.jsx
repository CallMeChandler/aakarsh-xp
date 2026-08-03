import { useState } from "react";
import "../styles/Games.css";

export default function Games({ onLaunchSnake }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!xTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
  };

  return (
    <div className="game-wrapper">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}><h2 className="game-title">Tic Tac Toe</h2><button className="reset-btn" onClick={onLaunchSnake}>🐍 Play Snake</button></div>
      <div className="game-grid">
        {board.map((cell, idx) => (
          <div key={idx} className="cell" onClick={() => handleClick(idx)}>
            {cell}
          </div>
        ))}
      </div>
      <div className="game-status">
        {winner ? (
          <p className="winner-text">{winner} wins!</p>
        ) : board.every(Boolean) ? (
          <p className="draw-text">It's a draw!</p>
        ) : (
          <p>Turn: {xTurn ? "X" : "O"}</p>
        )}
        <button onClick={resetGame} className="reset-btn">Reset</button>
      </div>
    </div>
  );
}

function calculateWinner(b) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diags
  ];
  for (const [a, b1, c] of lines) {
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
  }
  return null;
}
