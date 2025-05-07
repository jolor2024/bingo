import { useState, type FormEvent } from 'react';
import './App.css'; // Tailwind should be imported here
import BingoGame from './components/BingoGame';

function App() {
  const [userId, setUserId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [gameSpeed, setGameSpeed] = useState('');
  const [gameStarted, setGameStarted] = useState(true);

  function startGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Game started with:', { userId, difficulty, gameSpeed });
    setGameStarted(true);
  }

  return (
    <>
      {!gameStarted && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-white p-8 rounded-lg border-1 text-amber-500">
            <h1 className="text-3xl font-bold text-center text-amber-500 mb-6">
              Välkommen till Tivoli Bingo
            </h1>
            <form onSubmit={startGame} className="space-y-4">
              <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter User ID
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Difficulty</label>
                <div className="space-y-1">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={level}
                        name="difficulty"
                        value={level}
                        checked={difficulty === level}
                        onChange={() => setDifficulty(level)}
                        className="accent-amber-500"
                      />
                      <label htmlFor={level} className="text-sm text-gray-700 capitalize">{level}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Game Speed</label>
                <div className="space-y-1">
                  {[
                    { id: 'standard', label: 'Standard' },
                    { id: 'quick', label: 'Quick Game' },
                  ].map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={option.id}
                        name="gamespeed"
                        value={option.id}
                        checked={gameSpeed === option.id}
                        onChange={() => setGameSpeed(option.id)}
                        className="accent-amber-500"
                      />
                      <label htmlFor={option.id} className="text-sm text-gray-700">{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full !bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded mt-4 transition-colors"
              >
                Start Bingo
              </button>
            </form>
          </div>
        </div>
      )}

      {gameStarted && (
        <BingoGame userId={userId} difficulty={difficulty} gameSpeed={gameSpeed} />
      )}
    </>
  );
}

export default App;
