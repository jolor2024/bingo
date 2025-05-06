type BingoGameProps = {
    userId: string;
}

function BingoGame({userId} : BingoGameProps) {
    return (
        <div>
        <h2>Bingo</h2>
        <p>Your username {userId} </p>
      </div>
    )
}

export default BingoGame;