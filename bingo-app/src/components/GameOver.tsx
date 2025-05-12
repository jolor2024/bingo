import { useEffect } from "react";

type Props = {
  didPlayerWin: boolean;
  userId: string;
  payAmount: number;
  stakeAmount: number;
};

export default function GameOverMenu({ didPlayerWin, userId, payAmount, stakeAmount }: Props) {

 useEffect(() => {
  async function payout() {
    const url = "https://yrgobanken.vip/api/transactions";

    if (didPlayerWin) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            seller: "centralbank",
            buyer: userId,
            amount: payAmount,
            stamp: "platinum snake",
          }),
        });

        if (res.ok) {
          console.log("Payout successful!");
        } else {
          console.error(`Payout failed: ${res.status}`);
        }
      } catch (err) {
        console.error(" TransactionFetch error:", err);
      }
    } else {
      console.log("Stake payout...")
       try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            seller: userId,
            buyer: "centralbank",
            amount: stakeAmount,
            stamp: "platinum snake",
          }),
        });

        if (res.ok) {
          console.log("Stake payout successful!");
        } else {
          console.error(`Stake Payout failed: ${res.status}`);
        }
      } catch (err) {
        console.error("Transaction Fetch error:", err);
      }
    }
  }

  payout();
}, [didPlayerWin, userId, payAmount, stakeAmount]);



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