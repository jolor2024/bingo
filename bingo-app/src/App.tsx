import { useState, type FormEvent } from 'react'
import './App.css'

import BingoGame from './components/BingoGame';

function App() {
  const [userId, setUserId] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [gameSpeed, setGameSpeed] = useState('');

  const [gameStarted, setGameStarted] = useState(false);

  function startGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Game started with:', { userId, difficulty, gameSpeed });
    setGameStarted(true);
  }

  return (
    <>
    {!gameStarted && (
      <div>
      <h1 className='text-amber-400 text-2xl'>Välkommen till Tivoli Bingo</h1>
      <form onSubmit={startGame}>
      <h3>Enter User ID</h3>
      <input
        id="userId"
        name="userId"
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <h3>Select Difficulty</h3>
      <div className="difficulty-options">
        <input
          type="radio"
          id="easy"
          name="difficulty"
          value="easy"
          checked={difficulty === 'easy'}
          onChange={() => setDifficulty('easy')}
        />
        <label htmlFor="easy">Easy</label>

        <input
          type="radio"
          id="medium"
          name="difficulty"
          value="medium"
          checked={difficulty === 'medium'}
          onChange={() => setDifficulty('medium')}
        />
        <label htmlFor="medium">Medium</label>

        <input
          type="radio"
          id="hard"
          name="difficulty"
          value="hard"
          checked={difficulty === 'hard'}
          onChange={() => setDifficulty('hard')}
        />
        <label htmlFor="hard">Hard</label>
      </div>

      <h3>Select Game Speed</h3>
      <div className="game-speed-options">
        <input
          type="radio"
          id="standard"
          name="gamespeed"
          value="standard"
          checked={gameSpeed === 'standard'}
          onChange={() => setGameSpeed('standard')}
        />
        <label htmlFor="standard">Standard</label>

        <input
          type="radio"
          id="quick"
          name="gamespeed"
          value="quick"
          checked={gameSpeed === 'quick'}
          onChange={() => setGameSpeed('quick')}
        />
        <label htmlFor="quick">Quick Game</label>
      </div>

      <button type="submit">Start Bingo</button>
      </form>
    </div>
    )}

    {gameStarted && (
      <BingoGame userId={userId} difficulty={difficulty} gameSpeed={gameSpeed}/>
    )}
     
    </>
  )
}

export default App
