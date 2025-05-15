import BingoBoard from "./BingoBoard";
import GameOverMenu from "./GameOver";
import { useCallback, useState } from "react";

type Difficulty = "easy" | "medium" | "hard";
type GameSpeed = "standard" | "quick";
type BingoGameProps = {
  userId: string;
  difficulty: Difficulty;
  gameSpeed: GameSpeed;
  stake:number;
};


type BingoNumbers = {
  B: number[];
  I: number[];
  N: number[];
  G: number[];
  O: number[];
}

const BINGO_NUMBERS : BingoNumbers = {
  B: Array.from({ length: 15 }, (_, i) => i + 1),
  I: Array.from({ length: 15 }, (_, i) => i + 16),
  N: Array.from({ length: 15 }, (_, i) => i + 31),
  G: Array.from({ length: 15 }, (_, i) => i + 46),
  O: Array.from({ length: 15 }, (_, i) => i + 61),
};

function BingoGame({ userId, difficulty, gameSpeed, stake }: BingoGameProps) {
  const [latestDrawn, setLatestDrawn] = useState<string>("");
  const [drawnHistory, setDrawnHistory] = useState<string[]>([]);

  const [playerWon, setPlayerWon] = useState<boolean>(false);
  const [computerWon, setComputerWon] = useState<boolean>(false);

  const handlePlayerWon = useCallback((user: string): void => {
    if(user == userId) {
      setPlayerWon(true);
    } else {
      setComputerWon(true);
    }
  }, [userId])

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
  <>
    {(playerWon || computerWon) ? (
      <GameOverMenu didPlayerWin={playerWon} userId={userId} payAmount={10} stakeAmount={stake}/>
    ) : (
      <div className="w-full sm:p-6 p-0">

    {/* Display latest drawn */}
      {latestDrawn && (
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 my-4 flex items-center justify-center rounded-full bg-[#0CFF14] text-[#014A15] !text-3xl font-extrabold shadow-lg animate-bounce">
          {latestDrawn}
        </div>
      </div>
    )}

        {/* Header */}
        <div className="text-center mb-4">
          {/* Drawn history */}
          <ul className="overflow-x-auto overflow-y-hidden max-w-6xl mx-auto flex flex-nowrap gap-2 mb-8">
            {drawnHistory.map((entry, index) => (
              <li
                key={index}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FFCC00] text-[#643F0C] font-bold shadow shrink-0"
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
            className="!bg-[#00E31A]  text-[#005B26] font-bold px-6 py-2 rounded-full border-1 border-[#005B26]"
          >
            DRAW NUMBER
          </button>
        </div>



        {/* Boards layout */}
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <BingoBoard
              user={userId}
              drawnHistory={drawnHistory}
              gameSpeed={gameSpeed}
              onBingo={handlePlayerWon}
            />

            {difficulty === "easy" && (
              <BingoBoard
                user="Computer 1"
                drawnHistory={drawnHistory}
                gameSpeed={gameSpeed}
                onBingo={handlePlayerWon}
              />
            )}

            {difficulty === "medium" && (
              <>
                <BingoBoard user="Computer 1" drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
                <BingoBoard user="Computer 2" drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
              </>
            )}

            {difficulty === "hard" && (
              <>
                <BingoBoard user="Computer 1" drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
                <BingoBoard user="Computer 2" drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
                <BingoBoard user="Computer 3" drawnHistory={drawnHistory} gameSpeed={gameSpeed} onBingo={handlePlayerWon} />
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);

}

export default BingoGame;
