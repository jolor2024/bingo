import { useState, useEffect } from 'react';

type Props = {
  drawnHistory: string[]; // List of drawn numbers passed from BingoGame
};

function generateBingoBoard(): string[][] {
    const columns = [
      { letter: 'B', min: 1, max: 15 },
      { letter: 'I', min: 16, max: 30 },
      { letter: 'N', min: 31, max: 45 },
      { letter: 'G', min: 46, max: 60 },
      { letter: 'O', min: 61, max: 75 },
    ];
  
    const board: string[][] = [];
  

    for (let row = 0; row < 5; row++) {
      const rowNumbers: string[] = [];
  

      columns.forEach(({ letter, min, max }) => {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        rowNumbers.push(`${letter}${randomNum}`);
      });
  
      board.push(rowNumbers);
    }
  

    board[2][2] = 'FREE';
  
    return board;
  }

function BingoBoard({ drawnHistory }: Props) {
  const [card, setCard] = useState<string[][]>([]);

  useEffect(() => {
    const generatedBoard = generateBingoBoard();
    setCard(generatedBoard);
  }, []); 

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
