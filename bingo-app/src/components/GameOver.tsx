import { useEffect } from "react";

type Props = {
  didPlayerWin: boolean;
  userId: string;
  payAmount: number;
  stakeAmount: number;
};

export default function GameOverMenu({ didPlayerWin, payAmount, stakeAmount }: Props) {
  useEffect(() => {
    async function sendTransaction() {
      const url = "https://yrgobanken.vip/api/transactions";

      //Hämta här användarens jwt från local storage? 
      const jwtToken =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5cmdvYmFua2VuLnZpcCIsInN1YiI6MiwiZW1haWwiOiJqb25sb3IwNTI1QHNrb2xhLmdvdGVib3JnLnNlIiwiaWF0IjoxNzQ3NjQ2MjE0LCJleHAiOjE3NDc2NjA2MTR9.ng3J83bwswUwo_JKJmC0EqbZ2esK5ANfnBLD_X1AG4g";

      const apiKey = "8881504ea9b61f7a21da540ba5e4c0108f8a7624f2c30e388250c7f2f6677ad5";
      
     const payload: {
      amusement_id: string;
      stamp_id: string;
      payout_amount?: number;
      stake_amount?: number;
    } = {
      amusement_id: "2",
      stamp_id: "12",
    };

    if (didPlayerWin) {
      payload.payout_amount = payAmount;
    } else {
      payload.stake_amount = stakeAmount;
    }

      try {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwtToken}`,
            "x-api-key": apiKey,
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          console.log(`${didPlayerWin ? "Payout" : "Stake"} successful!`);
        } else {
          const error = await res.json();
          console.error(`${didPlayerWin ? "Payout" : "Stake"} failed:`, error);
        }
      } catch (err) {
        console.error("Transaction Fetch error:", err);
      }
    }

    sendTransaction();
  }, [didPlayerWin, payAmount, stakeAmount]);


return (
  <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 z-50 text-black">
    <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
      <h1 className="text-4xl text-black font-bold mb-4">
        {didPlayerWin ? "🎉 You won!" : "😞 You lost!"}
      </h1>
      <p className="text-lg font-medium mb-2 text-center pt-2">Your stake: ${stakeAmount}</p>
      {didPlayerWin && (
        <p className="text-lg font-medium mb-4 text-center pt-2">Reward: ${payAmount}</p>
      )}
      <a
        href="/"
        className="bg-[#00E31A] hover:bg-[#005B26] !text-[#005B26] !hover:text-[#00E31A] font-bold px-6 py-3 rounded-lg shadow-lg transition"
      >
        Play Again
      </a>
    </div>
  </div>
);

}