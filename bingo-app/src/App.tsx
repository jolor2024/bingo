import { useState, type FormEvent } from 'react'
import './App.css'

import BingoGame from './components/BingoGame';

function App() {
  const [userId, setUserId] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  function startGame(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setGameStarted(true);
  }
  return (
    <>
    {!gameStarted && (
      <div>
      <h1>Välkommen till Tivoli Bingo</h1>
        <form onSubmit={startGame}>
        <label htmlFor="userId">Enter User Id:</label>
        <input 
          id="userId"
          name="userId" 
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          />
        <button type='submit'>Start Bingo</button>
        </form>
      </div>

    )}

    {gameStarted && (
      <BingoGame userId={userId} />
    )}
     
    </>
  )
}

export default App
