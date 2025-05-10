import BingoBoard from "./BingoBoard";
import ComputerBoard from "./ComputerBoard";
import { useCallback, useState } from "react";

type BingoGameProps = {
  userId: string;
  difficulty: string;
  gameSpeed: string;
};

const BINGO_NUMBERS = {
  B: Array.from({ length: 15 }, (_, i) => i + 1),
  I: Array.from({ length: 15 }, (_, i) => i + 16),
  N: Array.from({ length: 15 }, (_, i) => i + 31),
  G: Array.from({ length: 15 }, (_, i) => i + 46),
  O: Array.from({ length: 15 }, (_, i) => i + 61),
};

function BingoGame({ userId, difficulty, gameSpeed }: BingoGameProps) {
  const [latestDrawn, setLatestDrawn] = useState("");
  const [drawnHistory, setDrawnHistory] = useState<string[]>([]);

  const [playerWon, setPlayerWon] = useState(false);
  const [computerWon, setComputerWon] = useState(false);
  const handlePlayerWon = useCallback((user: string) => {
    
    if(user == userId) {
      setPlayerWon(true);
    } else {
      setComputerWon(true);
    }

  }, [])

  function drawNewNumber() {
    if (drawnHistory.length >= 75) {
      console.warn("All BINGO numbers have been drawn.");
      return;
    }

    const letters = Object.keys(BINGO_NUMBERS) as (keyof typeof BINGO_NUMBERS)[];
    let isAlreadyDrawn = true;
    let drawn = "";

    while (isAlreadyDrawn) {
      const randomLetter = letters[Math.floor(Math.random() * 5)];
      const randomNumber = BINGO_NUMBERS[randomLetter][Math.floor(Math.random() * 15)];
      drawn = randomLetter + randomNumber;

      if (!drawnHistory.includes(drawn)) {
        isAlreadyDrawn = false;
      }
    }

    setLatestDrawn(drawn);
    setDrawnHistory((prevHistory) => [...prevHistory, drawn]);
  }

  return (
    <div className="w-full p-6">

      {playerWon && (
        <h1>You won!</h1>
      )}

      {computerWon && (
        <h1>You lost!</h1>
      )}
      {/* Header */}
      <div className="text-center mb-4">

      <p className="text-sm text-gray-600">Difficulty: <span className="capitalize">{difficulty}</span> | Speed: {gameSpeed}</p>

              {/* Drawn history */}
      <ul className="overflow-x-auto overflow-y-hidden max-w-6xl mx-auto flex flex-nowrap gap-2 mb-8 px-4">
        {drawnHistory.map((entry, index) => (
          <li
            key={index}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-400 text-white font-bold shadow shrink-0"
          >
            {entry}
          </li>
        ))}
      </ul>

       
      </div>

      {/* Draw number */}
      <div className="flex justify-center my-6">
        <button
          onClick={drawNewNumber}
          className="!bg-pink-500 !hover:bg-pink-600 text-white font-bold px-6 py-2 rounded-full shadow transition"
        >
          🎲 Draw Number
        </button>
      </div>

      {/* Display latest drawn */}
      {latestDrawn && (
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 my-4 flex items-center justify-center rounded-full bg-green-500 text-white !text-3xl font-extrabold shadow-lg animate-bounce">
            {latestDrawn}
          </div>
        </div>
      )}



     {/* Boards layout */}
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Player board */}
          <BingoBoard user={userId} drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />


        {/* Computer boards */}
        {difficulty === "easy" && (
            <BingoBoard user={"Computer 1"} drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />

        )}

        {difficulty === "medium" && (
          <>
              <BingoBoard user={"Computer 1"} drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
              <BingoBoard user={"Computer 2"} drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
          </>
        )}

        {difficulty === "hard" && (
          <>
              <BingoBoard user={"Computer 1"} drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
              <BingoBoard user={"Computer 2"} drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
              <BingoBoard user={"Computer 3"} drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
          </>
        )}
      </div>
    </div>

    </div>
  );
}

export default BingoGame;
