import { useEffect } from "react";

type Props = {
  didPlayerWin: boolean;
  userId: string;
  payAmount: number;
  stakeAmount: number;
};

type TransactionRequest = {
  transaction: "stake" | "payout";
  user_id: string;
  group_id: string;
  stake_amount: number;
  payout_amount: number;
  stamp: string;
};


type TransactionResponse = {
  status: string;
  message?: string;
  data?: any;
};

export default function GameOverMenu({ didPlayerWin, userId, payAmount, stakeAmount }: Props) {

  useEffect(() => {
    async function payout() {
      const url = "https://yrgobanken.vip/api/transactions";

      const transactionType = didPlayerWin ? "payout" : "stake"; // Determine the transaction type
      const amount = didPlayerWin ? payAmount : stakeAmount; // Determine the amount based on win/lose

      const payload: TransactionRequest = {
        transaction: transactionType, // 'payout' or 'stake'
        user_id: userId,
        group_id: "1", // 'group_id' is used as 'seller' 
        stake_amount: transactionType === "stake" ? amount : 0, // If it's stake, use stake_amount
        payout_amount: transactionType === "payout" ? amount : 0, // If it's payout, use payout_amount
        stamp: "platinum snake",
      };

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          console.log(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful!`);
        } else {
          console.error(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} failed: ${res.status}`);
        }
      } catch (err) {
        console.error("Transaction Fetch error:", err);
      }
    }

    // Call the payout function only if player win or lose
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