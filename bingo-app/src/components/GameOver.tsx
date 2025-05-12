import { useEffect } from "react";

type Props = {
  didPlayerWin: boolean;
  userId: string;
  amount: number;
};

export default function GameOverMenu({ didPlayerWin, userId, amount }: Props) {

  useEffect(() => {
    async function payout() {
      const url = "https://yrgobanken.vip/api/transactions";
      if(didPlayerWin) {
        try {
          await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
              seller: "centralbank",
              buyer: userId,
              amount: amount,
              stamp: "platinum snake",
            }),
          })
        } catch(err) {
          console.log("Error fetching api... ")
        }
      } else {
        console.log("Player lost")
      }
    }
    payout();
  }, [didPlayerWin, userId, amount])


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