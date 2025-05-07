import { useState, useEffect } from 'react';
import { generateBingoBoard } from '../utils/generateBoard';
import BingoBoard from './BingoBoard';

type Props = {
    id: string;
    drawnHistory: string[]; // List of drawn numbers passed from BingoGame
};

function ComputerBoard({ id, drawnHistory }: Props) {
  const [board, setBoard] = useState<string[][]>([]);

  useEffect(() => {
    setBoard(generateBingoBoard());
  }, []); 

  return (
    <div className="p-4 border rounded shadow-md bg-gray-100 mb-4">
    <h2 className="text-xl font-semibold mb-2 text-center">{id}</h2>
        {/* Reuse BingoBoard, but use custom board instead of generating again */}
        <BingoBoard drawnHistory={drawnHistory} computerBoard={board}/>
    </div>
  );
}

export default ComputerBoard;