import { useState, useEffect } from 'react';
import { generateBingoBoard } from '../utils/generateBoard';

type GameSpeed = "standard" | "quick";

type Props = {
  user: string;
  drawnHistory: string[]; // List of drawn numbers passed from BingoGame
  computerBoard?: string[][];
  gameSpeed: GameSpeed;
  onBingo?: (user: string) => void;
  playerWon?: boolean;
};


function BingoBoard({ user, drawnHistory, computerBoard, gameSpeed, onBingo, }: Props) {
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
    return drawnHistory.includes(cellValue) || cellValue == "FREE";
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

  useEffect(() => {
  if (hasBingo && onBingo) {
    onBingo(user);
  }
}, [hasBingo, onBingo, user]);

  return (
    <div className="w-full flex flex-col items-center bg-[#581BAE] p-4 rounded-3xl shadow-2xl border">

      {/* Board title */}
      <h2 className="!text-2xl font-bold text-[#FF1B67] mb-4"> Player: {user}</h2>

        {/* Column headers */}
      <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mb-2">
        {['B', 'I', 'N', 'G', 'O'].map((letter) => (
          <div
            key={letter}
            className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center text-xl font-extrabold text-[#631313] bg-[#FF1B67] rounded-2xl"
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
                className={`w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center text-xl font-bold rounded-2xl transition-all duration-200 ${
                  marked
                    ? 'bg-[#FFCC00] text-[#643F0C] scale-105'
                    : 'bg-[#9E32BE] text-[#441465] hover:bg-[#FFCC00]'
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
