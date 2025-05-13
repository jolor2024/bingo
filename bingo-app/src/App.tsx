import { useState, type FormEvent } from 'react';
import './App.css';
import BingoGame from './components/BingoGame';


type Difficulty = "easy" | "medium" | "hard";
type GameSpeed = "standard" | "quick";



function App() {
  const [userId, setUserId] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [gameSpeed, setGameSpeed] = useState<GameSpeed>('standard');
  const [gameStarted, setGameStarted] = useState(false);

  const difficultyLevels: readonly Difficulty[] = ['easy', 'medium', 'hard'];
  const gameSpeedOptions: readonly { id: GameSpeed; label: string }[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'quick', label: 'Quick Game' },
];

  function startGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Game started with:', { userId, difficulty, gameSpeed });
    setGameStarted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-yellow-100 to-teal-200 flex items-center justify-center p-4">
      {!gameStarted ? (
        <div className="max-w-[1000px] mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-pink-300">
          <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-6 drop-shadow-md">
            🎉 Tivoli Bingo 🎉
          </h1>
          <p className="text-center text-sm text-gray-600 mb-6">Enter your details to start!</p>

          <form onSubmit={startGame} className="space-y-6">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                User ID
              </label>
              <input
                id="userId"
                name="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Choose Difficulty</label>
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
                    <div className="peer-checked:bg-pink-200 peer-checked:text-pink-900 text-center px-4 py-2 rounded-full border border-gray-300 cursor-pointer transition-all hover:bg-pink-100">
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Game Speed</label>
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
                    <div className="peer-checked:bg-teal-200 peer-checked:text-teal-900 text-center px-4 py-2 rounded-full border border-gray-300 cursor-pointer transition-all hover:bg-teal-100">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full !bg-pink-500 !hover:bg-pink-600 !text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-200"
            >
              🚀 Start Bingo!
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center p-4">
        <BingoGame userId={userId} difficulty={difficulty} gameSpeed={gameSpeed} />
        </div>
      )}
    </div>
  );
}

export default App;
