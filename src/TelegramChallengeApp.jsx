import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function TelegramChallengeApp() {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);
  const [step, setStep] = useState("loading");
  const [eliminated, setEliminated] = useState(false);
  const [tab, setTab] = useState("main");
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready();
      setTg(webApp);
      setUser(webApp.initDataUnsafe?.user || { first_name: "Tester" });
    } else {
      setUser({ first_name: "Tester" });
    }
  }, []);

  useEffect(() => {
    if (step === "loading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep("intro");
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
  }, [step]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

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

  if (!user) return <div className="p-4 text-white">Loading user...</div>;

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
        <img src="/logo2.png" alt="Loading" className="w-32 h-32 animate-pulse" />
        <div className="w-64 h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-white text-sm">Loading... {progress}%</p>
      </div>
    );
  }

  if (tab === "leaderboard") {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">🏆 Leaderboard (coming soon)</div>;
  }
  if (tab === "profile") {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">👤 Profile (coming soon)</div>;
  }

  if (tab === "main" && step === "intro") {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "#000000" } },
            fpsLimit: 60,
            particles: {
              number: { value: 60 },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.5 },
              size: { value: { min: 1, max: 3 } },
              move: { enable: true, speed: 1.5, direction: "right", straight: true }
            },
            detectRetina: true
          }}
          className="absolute inset-0 z-0"
        />

        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 pt-20">
          <img src="/logo1.png" alt="Challenge Logo" className="w-24 h-24 animate-pulse drop-shadow-lg" />
          <h1 className="text-2xl font-bold">THE CHALLENGE</h1>
          <p className="text-lg text-gray-300">⏳ Countdown: 00:{countdown.toString().padStart(2, "0")}</p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 rounded-xl"
            onClick={handleStart}
          >
            Start Challenge
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-black/70 py-4 flex justify-around border-t border-gray-700 z-10">
          <button className={`text-sm ${tab === "leaderboard" ? "text-white font-bold" : "text-gray-300"}`} onClick={() => setTab("leaderboard")}>🏆 Leaderboard</button>
          <button className={`text-sm ${tab === "main" ? "text-white font-bold" : "text-gray-300"}`} onClick={() => setTab("main")}>🎮 Play</button>
          <button className={`text-sm ${tab === "profile" ? "text-white font-bold" : "text-gray-300"}`} onClick={() => setTab("profile")}>👤 Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 space-y-6">
      {eliminated && (
        <div className="text-center space-y-4">
          <img src="/logo1.png" alt="Eliminated" className="w-24 h-24 opacity-50" />
          <h2 className="text-2xl font-bold text-red-500">You were eliminated</h2>
          <p>Try again tomorrow!</p>
        </div>
      )}

      {/* ...rest remains unchanged */}
    </div>
  );
}
