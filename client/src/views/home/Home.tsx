import { useState, useEffect } from "react";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);

  useEffect(() => {
    const storedBestTime = localStorage.getItem("best-time");
    if (storedBestTime) {
      setBestTime(JSON.parse(storedBestTime));
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  useEffect(() => {
    const handleSpacePress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setIsRunning((prev) => !prev);
      }
    };

    const habdleResetPress = (event: KeyboardEvent) => {
      if (event.code === "KeyR") {
        handleReset();
      }
    };

    window.addEventListener("keydown", handleSpacePress);
    window.addEventListener("keydown", habdleResetPress);
    return () => {
      window.removeEventListener("keydown", handleSpacePress);
      window.removeEventListener("keydown", habdleResetPress);
    };
  }, []);

  function handleReset() {
    setTime(0);
    setIsRunning(false);
  }

  function handleSaveTime() {
    if (bestTime === null || time < bestTime) {
      localStorage.setItem("best-time", JSON.stringify(time));
      setBestTime(time);
    } else {
      alert("New time is not better than the current best time.");
    }
  }

  function formatTime(timeInMilliseconds: number) {
    const minutes = Math.floor(timeInMilliseconds / 60000);
    const seconds = Math.floor((timeInMilliseconds % 60000) / 1000);
    const milliseconds = timeInMilliseconds % 1000;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
  }

  return (
    <div className='bg-gray-900 min-h-screen text-white px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col justify-center items-center pt-16 gap-8'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl text-center'>
          RUBIK'S TIMER
        </h1>
        <div className='flex flex-wrap justify-center gap-4'>
          <button
            className={`px-4 py-2 rounded text-sm sm:text-base ${
              isRunning ? "bg-red-500" : "bg-green-900"
            }`}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "STOP" : "START"}
          </button>
          <button
            disabled={time === 0}
            className={`px-4 py-2 rounded border border-black ${
              time === 0
                ? "bg-slate-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-black"
            } text-sm sm:text-base`}
            onClick={handleReset}
          >
            RESET
          </button>

          {time > 0 && !isRunning && (
            <button
              onClick={handleSaveTime}
              className='bg-slate-800 px-4 py-2 rounded text-sm sm:text-base'
            >
              NEW BEST TIME
            </button>
          )}
        </div>
        <div className='text-6xl sm:text-7xl lg:text-9xl text-center'>
          {formatTime(time)}
        </div>

        <div className='flex flex-col items-center gap-4'>
          <h2 className='text-2xl sm:text-4xl text-center'>Best Time</h2>
          {bestTime !== null ? (
            <div className='text-xl sm:text-3xl text-center'>
              {formatTime(bestTime)}
            </div>
          ) : (
            <div className='text-xl sm:text-3xl text-center'>
              No best time yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
