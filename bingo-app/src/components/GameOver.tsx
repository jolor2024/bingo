type Props = {
  didPlayerWin: boolean;
};

export default function GameOverMenu({ didPlayerWin }: Props) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-opacity-80 z-50 text-pink-600">
      <h1 className="text-4xl font-bold mb-4">
        {didPlayerWin ? "🎉 You won!" : "😞 You lost!"}
      </h1>
      <a
        href="/"
        className="bg-pink-600 hover:bg-pink-700 !text-white font-bold px-6 py-3 rounded-full shadow-lg transition"
      >
        🔄 Play Again
      </a>
    </div>
  );
}