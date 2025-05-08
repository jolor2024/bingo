export function generateBingoBoard(gameSpeed : string): string[][] {
  const columns = [
    { letter: "B", min: 1, max: 15 },
    { letter: "I", min: 16, max: 30 },
    { letter: "N", min: 31, max: 45 },
    { letter: "G", min: 46, max: 60 },
    { letter: "O", min: 61, max: 75 },
  ];

  const board: string[][] = Array.from({ length: 5 }, () => Array(5).fill(""));

  columns.forEach((col, colIndex) => {
    const numbers: number[] = [];

    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * (col.max - col.min + 1)) + col.min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }

    for (let row = 0; row < 5; row++) {
      board[row][colIndex] = `${col.letter}${numbers[row]}`;
    }
  });


  if(gameSpeed == "standard") {
    board[2][2] = "FREE"; 
  } else if(gameSpeed =="quick") {
    board[2][2] = "FREE"; 
    board[0][4] = "FREE";
    board[4][0] = "FREE";  
  }
  // Set the center space (free space)
  

  return board;
}
