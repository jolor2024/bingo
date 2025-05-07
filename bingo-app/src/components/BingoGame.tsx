import BingoBoard from "./BingoBoard";
import ComputerBoard from "./ComputerBoard";
import { useEffect, useState } from "react";

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



function BingoGame({userId, difficulty, gameSpeed} : BingoGameProps) {
    const [latestDrawn, setLatestDrawn] = useState("");
    const [drawnHistory, setDrawnHistory] = useState<string[]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    
    function drawNewNumber() {

        if (drawnHistory.length >= 75) {
            console.warn("All BINGO numbers have been drawn.");
            return;
        } else {
            const letters = Object.keys(BINGO_NUMBERS) as (keyof typeof BINGO_NUMBERS)[];

            let isAlreadyDrawn = true;
            let drawn = "";
            while(isAlreadyDrawn) {
                const randomLetter = letters[Math.floor(Math.random() * 5)];
                const randomNumber = BINGO_NUMBERS[randomLetter][Math.floor(Math.random() * 15)]; 
        
                drawn = randomLetter + randomNumber;

                if(!drawnHistory.includes(drawn)) {
                        isAlreadyDrawn=false;
                    }
                }

                setLatestDrawn(drawn);
                setDrawnHistory(prevHistory => [...prevHistory, drawn]);
        }

        
    }

    return (
    <>
        <div>
            <button
                onClick={drawNewNumber}>
                Dra nummer
            </button>
        </div>
   
      {/* Spinning h1 */}
      {latestDrawn && (
        <h1
          className={`w-30 h-30 m-2 mx-auto flex items-center justify-center rounded-full bg-green-600 text-white text-4xl font-extrabold shadow-lg ${
            isSpinning ? "spin" : ""
          }`}
        >
          {latestDrawn}
        </h1>
      )}

        <ul className="flex flex-wrap gap-2 justify-center mb-6">
            {drawnHistory.map((entry, index) => (
                <li
                key={index}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-amber-500 text-white font-bold shadow"
                >
                {entry}
                </li>
            ))}
        </ul>

        <BingoBoard drawnHistory={drawnHistory} />

        <ComputerBoard/>
    </> 
        
    )
}

export default BingoGame;