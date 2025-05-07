export function generateBingoBoard(): string[][] {
    const columns = [
      { letter: 'B', min: 1, max: 15 },
      { letter: 'I', min: 16, max: 30 },
      { letter: 'N', min: 31, max: 45 },
      { letter: 'G', min: 46, max: 60 },
      { letter: 'O', min: 61, max: 75 },
    ];
  
    const board: string[][] = [];
    /* Lägg till så det inte blir duplicates i samma cell.*/
    for (let row = 0; row < 5; row++) {
      const rowNumbers: string[] = [];
  

      columns.forEach(({ letter, min, max }) => {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        rowNumbers.push(`${letter}${randomNum}`);
      });
  
      board.push(rowNumbers);
    }
  

    board[2][2] = 'FREE';
  
    return board;
}