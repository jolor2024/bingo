import { useEffect, useState } from "react";

type Props = {
  didPlayerWin: boolean;
  payAmount: number;
  stakeAmount: number;
};

export default function GameOverMenu({ didPlayerWin, payAmount, stakeAmount }: Props) {
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Blocked JWT from unauthorized origin:", event.origin);
        return;
      }

      if (event.data?.type === "JWT_TOKEN") {
        setJwtToken(event.data.token);
        console.log("Received JWT from parent in GameOverMenu");
      }
    };

    window.addEventListener("message", handleMessage);

  
    if (window.parent !== window) {
      window.parent.postMessage({ type: "GAME_READY" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("Blocked JWT from unauthorized origin:", event.origin);
        return;
      }

      if (event.data?.type === "JWT_TOKEN") {
        setJwtToken(event.data.token);
        console.log("Received JWT from parent in GameOverMenu");
      }
    };

    window.addEventListener("message", handleMessage);

    if (window.parent !== window) {
      window.parent.postMessage({ type: "GAME_READY" }, "*");
    }

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!jwtToken) return;

    const sendTransaction = async () => {
      const url = "https://yrgobanken.vip/api/transactions";
      const apiKey = "8881504ea9b61f7a21da540ba5e4c0108f8a7624f2c30e388250c7f2f6677ad5";

      const payload: {
        amusement_id: string;
        stamp_id?: string;
        payout_amount?: number;
        stake_amount?: number;
      } = {
        amusement_id: "2",
      };

      if (didPlayerWin) {
        payload.stamp_id = "12";
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
    };

    sendTransaction();
  }, [jwtToken, didPlayerWin, payAmount, stakeAmount]);

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
