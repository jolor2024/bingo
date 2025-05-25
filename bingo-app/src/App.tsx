import { useState, type FormEvent } from "react";
import "./App.css";
import BingoGame from "./components/BingoGame";
import background from "./assets/background.svg";

type Difficulty = "easy" | "medium" | "hard";
type GameSpeed = "standard" | "quick";

function App() {
  const [userId, setUserId] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [gameSpeed, setGameSpeed] = useState<GameSpeed>("standard");
  const [stake, setStake] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState(false);

  const difficultyLevels: readonly Difficulty[] = ["easy", "medium", "hard"];
  const gameSpeedOptions: readonly { id: GameSpeed; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "quick", label: "Quick Game" },
  ];

  function startGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Game started with:", { userId, difficulty, gameSpeed });
    setGameStarted(true);
  }

  return (
    <div
      className="min-h-screen bg-[#87F6FF] flex items-center justify-center p-0 sm:p-4"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#87F6FF",
      }}
    >
      {!gameStarted ? (
        <div className="mx-auto text-white bg-[#581BAE] backdrop-blur-md p-8 rounded-3xl shadow-2xl">
          <h1 className="px-4 text-5xl font-extrabold text-center text-[#FFFF48] mb-6 drop-shadow-2xl ">
            Tivoli Bingo
          </h1>
          <p className="text-center text-base mb-6">
            Enter your details to start!
          </p>

          <form onSubmit={startGame} className="space-y-6">
            <div>
              <label htmlFor="userId" className="block font-medium mb-1 ">
                Enter name
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="w-full border border-gray-300 bg-white text-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md min-w-[44px] min-h-[44px]"
              />
            </div>

            <fieldset>
              <legend className="block font-medium mb-1">
                Select difficulty
              </legend>
              <div className="flex justify-between gap-4">
                {difficultyLevels.map((level) => (
                  <label key={level} className="flex-1">
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={difficulty === level}
                      onChange={() => setDifficulty(level)}
                      className="hidden peer"
                      required
                    />
                    <div className="peer-checked:bg-[#FF6F3B] peer-checked:text-[#781C00] bg-[#FFFF3F] text-black text-center px-4 py-2 rounded-full border cursor-pointer transition-all hover:bg-[#FF6F3B] min-w-[44px] min-h-[44px]">
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
              <p className="block font-light">Reward multipliers: x2, x3, x4</p>
            </fieldset>

            <fieldset>
              <legend className="block font-mediu mb-1">
                Select game speed
              </legend>
              <div className="flex justify-between gap-4">
                {gameSpeedOptions.map((option) => (
                  <label key={option.id} className="flex-1">
                    <input
                      type="radio"
                      name="gamespeed"
                      value={option.id}
                      checked={gameSpeed === option.id}
                      onChange={() => setGameSpeed(option.id)}
                      className="hidden peer"
                      required
                    />
                    <div className="peer-checked:bg-[#FF6F3B] peer-checked:text-[#781C00]  bg-[#FFFF3F] text-black text-center px-4 py-2 rounded-full border  cursor-pointer transition-all hover:bg-[#FF6F3B] min-w-[44px] min-h-[44px]">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label htmlFor="userId" className="block font-medium mb-1">
                Enter your stake in euros
              </label>
              <input
                id="stake"
                name="stake"
                type="number"
                title="Enter a numeric value of how many Euros you wish to bet"
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                required
                className="w-full border border-gray-300 bg-white text-black rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md min-w-[44px] min-h-[44px]"
              />
            </div>

            <button
              type="submit"
              className="w-full !bg-[#00E31A] !hover:bg-pink-600 !text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-200 min-w-[44px] min-h-[44px]"
            >
              Start Game!
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-4">
          <BingoGame
            userId={userId}
            difficulty={difficulty}
            gameSpeed={gameSpeed}
            stake={stake}
          />
        </div>
      )}
    </div>
  );
}

export default App;
