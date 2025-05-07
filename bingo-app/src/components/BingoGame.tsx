import InfoDrawnNumbers from "./DrawnNumbers";
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
    
    function drawNewNumber() {
        const letters = Object.keys(BINGO_NUMBERS) as (keyof typeof BINGO_NUMBERS)[];

        const randomLetter = letters[Math.floor(Math.random() * 5)];
        const randomNumber = BINGO_NUMBERS[randomLetter][Math.floor(Math.random() * 15)]; 

        const drawn = randomLetter + randomNumber;
       
        setLatestDrawn(drawn);
        setDrawnHistory(prevHistory => [...prevHistory, drawn]);
    }

    useEffect(()=>{
        drawNewNumber();
    }, []);


    return (
    <>
        <h1>{latestDrawn}</h1>
        <h2>{userId}</h2>
        <h3>{difficulty}</h3>
        <h4>{gameSpeed}</h4>

        {/* Display drawn history */}
        <ul>
            {drawnHistory.map((entry, index) => (
                <li key={index}>{entry}</li>
            ))}
        </ul>
        <InfoDrawnNumbers /> 
        <BingoBoard />
        <ComputerBoard/>
    </> 
        
    )
}

export default BingoGame;