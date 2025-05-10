import { useState, useEffect } from 'react';
import { generateBingoBoard } from '../utils/generateBoard';
import BingoBoard from './BingoBoard';

type Props = {
    user: string;
    drawnHistory: string[]; // List of drawn numbers passed from BingoGame
    gameSpeed: string;
};

function ComputerBoard({ user, drawnHistory, gameSpeed }: Props) {
  const [board, setBoard] = useState<string[][]>([]);

  useEffect(() => {
    setBoard(generateBingoBoard(gameSpeed));
  }, []); 

  return (
    <>
      <BingoBoard  user={user} drawnHistory={drawnHistory} computerBoard={board} gameSpeed={gameSpeed}/>
    </>
  );
}

export default ComputerBoard;