
import { useEffect, useState } from "react";

export default function TelegramChallengeApp() {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [step, setStep] = useState("intro");
  const [eliminated, setEliminated] = useState(false);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      setTg(webApp);
      setUser(webApp.initDataUnsafe.user);
    }
  }, []);

  const handleStart = () => {
    const hasPaid = true;
    if (!hasPaid) return alert("Please complete the entry payment");
    setStep("question1");
  };

  const handleQuestion1 = (answer) => {
    if (answer !== "42") return setEliminated(true);
    setStep("luck");
  };

  const handleDice = (choice) => {
    const roll = Math.floor(Math.random() * 6) + 1;
    const correct = choice === "above" ? roll > 3.5 : roll <= 3.5;
    if (!correct) return setEliminated(true);
    setStep("question2");
  };

  const handleQuestion2 = (answer) => {
    if (answer !== "Mount Everest") return setEliminated(true);
    setStep("winner");
  };

  if (!tg || !user) return <div>Loading...</div>;

  if (eliminated) return <div className="p-4 text-center">You were eliminated. Try again tomorrow!</div>;

  return (
    <div className="p-4 space-y-4 text-center">
      {step === "intro" && (
        <>
          <h1 className="text-xl font-bold">Welcome to the Challenge!</h1>
          <p>Hello {user.first_name}, ready to test your luck and knowledge?</p>
          <button className="rounded-xl bg-blue-500 text-white px-4 py-2" onClick={handleStart}>
            Start Challenge
          </button>
        </>
      )}

      {step === "question1" && (
        <>
          <p>What is the answer to life, the universe, and everything?</p>
          <button onClick={() => handleQuestion1("42")} className="bg-green-500 text-white px-4 py-2 rounded-xl">42</button>
          <button onClick={() => handleQuestion1("24")} className="bg-red-500 text-white px-4 py-2 rounded-xl">24</button>
        </>
      )}

      {step === "luck" && (
        <>
          <p>Roll a dice! Guess the outcome: above or below 3.5?</p>
          <button onClick={() => handleDice("above")} className="bg-blue-500 text-white px-4 py-2 rounded-xl">Above</button>
          <button onClick={() => handleDice("below")} className="bg-yellow-500 text-black px-4 py-2 rounded-xl">Below</button>
        </>
      )}

      {step === "question2" && (
        <>
          <p>What is the tallest mountain in the world?</p>
          <button onClick={() => handleQuestion2("Mount Everest")} className="bg-green-500 text-white px-4 py-2 rounded-xl">Mount Everest</button>
          <button onClick={() => handleQuestion2("K2")} className="bg-red-500 text-white px-4 py-2 rounded-xl">K2</button>
        </>
      )}

      {step === "winner" && (
        <div>
          <h2 className="text-2xl font-bold">🏆 You completed the challenge!</h2>
          <p>We will contact winners for prize distribution.</p>
        </div>
      )}
    </div>
  );
}
