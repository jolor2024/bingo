import BingoBoard from "./BingoBoard";
import ComputerBoard from "./ComputerBoard";
import { useState } from "react";


type BingoGameProps = {
    userId: string;
    difficulty: string;
    gameSpeed: string;
}


const BINGO_NUMBERS = {
  B: Array.from({ length: 15 }, (_, i) => i + 1),
  I: Array.from({ length: 15 }, (_, i) => i + 16),
  N: Array.from({ length: 15 }, (_, i) => i + 31),
  G: Array.from({ length: 15 }, (_, i) => i + 46),
  O: Array.from({ length: 15 }, (_, i) => i + 61),
};

function BingoGame({userId, difficulty, gameSPeed} : BingoGameProps) {
  const [latestDrawn, setLatestDrawn] = useState("");
  const [drawnHistory, setDrawnHistory] = useState<string[]>([]);

  function drawNewNumber() {
    if (drawnHistory.length >= 75) {
      console.warn("All BINGO numbers have been drawn.");
      return;
    } else {
      const letters = Object.keys(
        BINGO_NUMBERS
      ) as (keyof typeof BINGO_NUMBERS)[];

      let isAlreadyDrawn = true;
      let drawn = "";
      while (isAlreadyDrawn) {
        const randomLetter = letters[Math.floor(Math.random() * 5)];
        const randomNumber =
          BINGO_NUMBERS[randomLetter][Math.floor(Math.random() * 15)];

        drawn = randomLetter + randomNumber;

        if (!drawnHistory.includes(drawn)) {
          isAlreadyDrawn = false;
        }
      }

      setLatestDrawn(drawn);
      setDrawnHistory((prevHistory) => [...prevHistory, drawn]);
    }
  }

  return (
    <>
      <h1>User id: {userId}</h1>
      <div>
        <button onClick={drawNewNumber}>Dra nummer</button>
      </div>

      {/* Spinning h1 */}
      {latestDrawn && (
        <h1
          className={`w-30 h-30 m-2 mx-auto flex items-center justify-center rounded-full bg-green-600 text-white text-4xl font-extrabold shadow-lg
          }`}
        >
          {latestDrawn}
        </h1>
      )}

      <ul className="overflow-x-auto overflow-y-hidden max-w-[1000px] mx-auto flex flex-nowrap gap-2 mb-6">
        {drawnHistory.map((entry, index) => (
          <li
            key={index}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 text-white font-bold shadow shrink-0"
          >
            {entry}
          </li>
        ))}
      </ul>

      <BingoBoard drawnHistory={drawnHistory} />
      <div className="flex flex-col md:flex-row gap-4">
        {/* Ange antal beroende på difficulty */}
        {difficulty == "easy"  && (
             <ComputerBoard id={"Computer 1"} drawnHistory={drawnHistory} />
        )}

        {difficulty == "medium"  && (
            <>
                <ComputerBoard id={"Computer 1"} drawnHistory={drawnHistory} />
                <ComputerBoard id={"Computer 2"} drawnHistory={drawnHistory} />
            </>
        )}

        {difficulty == "hard"  && (
            <>
                <ComputerBoard id={"Computer 1"} drawnHistory={drawnHistory} />
                <ComputerBoard id={"Computer 2"} drawnHistory={drawnHistory} />
                <ComputerBoard id={"Computer 3"} drawnHistory={drawnHistory} />
            </>
        )}
       

      </div>
    </>
  );
}

export default BingoGame;
