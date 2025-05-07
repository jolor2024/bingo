import { useState, useEffect } from 'react';
import { generateBingoBoard } from '../utils/generateBoard';

type Props = {
  drawnHistory: string[]; // List of drawn numbers passed from BingoGame
  computerBoard?: string[][];
};


function BingoBoard({ drawnHistory, computerBoard }: Props) {
  const [card, setCard] = useState<string[][]>([]);

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

  return (
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
  );
}

export default BingoBoard;
