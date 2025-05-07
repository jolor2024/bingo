import { useState, useEffect } from 'react';
import { generateBingoBoard } from '../utils/generateBoard';

type Props = {
  drawnHistory: string[]; // List of drawn numbers passed from BingoGame
  computerBoard?: string[][];
};


function BingoBoard({ drawnHistory, computerBoard }: Props) {
  const [card, setCard] = useState<string[][]>([]);
  const [hasBingo, setHasBingo] = useState(false);

  useEffect(() => {
    if(computerBoard) {
      setCard(computerBoard);
    } else {
      const generatedBoard = generateBingoBoard();
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
    <>
    {hasBingo && (
        <h1 className='py-4 text-amber-400'>Bingo!!</h1>
      )}
    
    <div className="grid grid-cols-5 gap-1 max-w-md mx-auto mb-6">
      {card.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const marked = isMarked(cell); // Check if the cell is marked
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-16 h-16 flex items-center justify-center text-lg font-bold border rounded ${marked ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}`}
            >
              {cell}
            </div>
          );
        })
      )}
    </div>

    </>
  );
}

export default BingoBoard;
