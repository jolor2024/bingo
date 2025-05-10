import { useState, useEffect } from 'react';
import { generateBingoBoard } from '../utils/generateBoard';

type Props = {
  user: string;
  drawnHistory: string[]; // List of drawn numbers passed from BingoGame
  computerBoard?: string[][];
  gameSpeed: string
};


function BingoBoard({ user, drawnHistory, computerBoard, gameSpeed }: Props) {
  const [card, setCard] = useState<string[][]>([]);
  const [hasBingo, setHasBingo] = useState(false);

  useEffect(() => {
    if(computerBoard) {
      setCard(computerBoard);
    } else {
      const generatedBoard = generateBingoBoard(gameSpeed);
      setCard(generatedBoard);
    }
  }, [computerBoard]); 

  // Check if a cell is marked
  function isMarked(cellValue: string): boolean {
    return drawnHistory.includes(cellValue);
  }

  function hasRowBingo(board: string[][], drawn: string[]): boolean {
    return board.some(row =>
      row.every(cell => cell === 'FREE' || drawn.includes(cell))
    );
  }

  function hasColumnBingo(board: string[][], drawn: string[]): boolean {
    for (let col = 0; col < 5; col++) {
      let bingo = true;
  
      for (let row = 0; row < 5; row++) {
        const cell = board[row][col];
        if (cell !== 'FREE' && !drawn.includes(cell)) {
          bingo = false;
          break;
        }
      }
  
      if (bingo) return true;
    }
  
    return false;
  }
  
  function hasDiagonalBingo(board: string[][], drawn: string[]): boolean {
    const diagonal1 = [0, 1, 2, 3, 4].every(i => board[i][i] === 'FREE' || drawn.includes(board[i][i]));
    const diagonal2 = [0, 1, 2, 3, 4].every(i => board[i][4 - i] === 'FREE' || drawn.includes(board[i][4 - i]));
  
    return diagonal1 || diagonal2;
  }

  useEffect(() => {
    if (card.length === 0 || hasBingo) return;
  
    if (hasRowBingo(card, drawnHistory) || hasColumnBingo(card, drawnHistory) ||hasDiagonalBingo(card, drawnHistory)) {
      setHasBingo(true);
    } 
  }, [card, drawnHistory, hasBingo]);

  return (
    <div className="w-full flex flex-col items-center bg-white p-4 rounded-3xl shadow-2xl border border-pink-300">

      {/* Board title */}
      <h2 className="!text-2xl font-bold text-pink-600 mb-4"> Player: {user}</h2>

        {/* Column headers */}
  <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-2">
    {['B', 'I', 'N', 'G', 'O'].map((letter) => (
      <div
        key={letter}
        className="w-14 h-14 flex items-center justify-center text-xl font-extrabold text-white bg-pink-500 rounded-2xl border border-pink-300"
      >
        {letter}
      </div>
    ))}
  </div>

      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-6">
        {card.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const marked = isMarked(cell);
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-2xl border border-pink-300 transition-all duration-200 ${
                  marked
                    ? 'bg-green-500 text-white scale-105'
                    : 'bg-white text-gray-800 hover:bg-yellow-100'
                }`}
              >
                {cell}
              </div>
            );
          })
        )}
      </div>

      {hasBingo && (
        <div className="py-4 text-center">
          <h1 className="!text-3xl font-extrabold bg-gradient-to-r from-amber-400 via-pink-400 to-teal-400 text-transparent bg-clip-text animate-pulse drop-shadow-lg">
            🎉 BINGO!! 🎉
          </h1>
        </div>
      )}
    </div>
  );
  
}

export default BingoBoard;
