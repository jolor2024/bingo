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
    const [drawnNumbers, setDrawnNumbers] = useState({
        B: [] as number[],
        I: [] as number[],
        N: [] as number[],
        G: [] as number[],
        O: [] as number[],
      });

    const [latestDrawnNumber, setLatestDrawnNumber] = useState(0);
    const [latestDrawnLetter, setLatestDrawnLetter] = useState("");
    
    function drawNewNumber() {
        const letters = Object.keys(BINGO_NUMBERS) as (keyof typeof BINGO_NUMBERS)[];

        const randomLetter = letters[Math.floor(Math.random() * 5)];

        const randomNumber = Math.floor(Math.random() * 15);
        setLatestDrawnNumber(BINGO_NUMBERS[randomLetter][randomNumber]); // for testing
        setLatestDrawnLetter(randomLetter);
    }

    useEffect(()=>{
        drawNewNumber();
    }, []);


    return (
    <>
        <h1>{latestDrawnLetter}{latestDrawnNumber}</h1>
        {/* <InfoDrawnNumbers /> */}
        <BingoBoard />
        <ComputerBoard/>
    </> 
        
    )
}

export default BingoGame;