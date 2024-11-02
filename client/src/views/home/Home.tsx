import { useState, useEffect } from "react";

export default function Home() {
  const [timerCount, setTimerCount] = useState<number>(0);
  const [isTimerSet, setTimer] = useState(false);
  const [bestTime, setBestTime] = useState<number | null>(null);

  console.log(bestTime);

  useEffect(() => {
    if (localStorage.getItem("best-time") === null) {
      localStorage.setItem("best-time", JSON.stringify(0));
    }

    const bestTime = localStorage.getItem("best-time");
    if (bestTime) {
      setBestTime(JSON.parse(bestTime));
    }
    let interval: NodeJS.Timeout;
    if (isTimerSet) {
      interval = setInterval(() => {
        setTimerCount((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerSet]);

  useEffect(() => {
    const handleSpacePress = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        setTimer((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleSpacePress);
    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    };
  }, []);

  function handleReset() {
    setTimerCount(0);
    setTimer(false);
  }

  function handleSaveTime() {
    // Save time to local storage in seconds
    if (timerCount < bestTime!) {
      localStorage.setItem("best-time", JSON.stringify(timerCount));
      setBestTime(timerCount);
    }
  }

  return (
    <div className='bg-gray-900 h-dvh text-white'>
      <div className='flex flex-col justify-center items-center pt-16 gap-8'>
        <h1 className='text-4xl text-white'>RUBIKS TIMER</h1>
        <div className='flex gap-4'>
          <button
            // ref={startBtn}
            className={`px-4 py-2 rounded ${
              isTimerSet ? "bg-red-500 " : "bg-green-900"
            }`}
            onClick={() => setTimer(!isTimerSet)}
          >
            {isTimerSet ? "STOP" : "START"}
          </button>
          <button
            disabled={timerCount === 0}
            className={`px-4 py-2 rounded border-black border-solid border-2 ${
              timerCount === 0 ? "bg-slate-200 text-gray-500" : "bg-white"
            }`}
            onClick={handleReset}
          >
            RESET
          </button>

          {timerCount > 0 && !isTimerSet ? (
            <button
              onClick={handleSaveTime}
              className='bg-slate-800 px-4 py-2 rounded'
            >
              NEW BEST TIME
            </button>
          ) : (
            ""
          )}
        </div>
        {timerCount < 60 ? (
          <div className='text-9xl '>{timerCount} sec</div>
        ) : (
          <div className='text-9xl'>{(timerCount / 60).toFixed(2)} min</div>
        )}

        <div className='flex flex-col items-center gap-4'>
          <h2 className='text-4xl'>Best Time</h2>
          {/* {bestTime} sec */}
          {bestTime !== null && bestTime < 60 ? (
            <div className='text-3xl'>{bestTime} sec</div>
          ) : (
            <div className='text-3xl'>{(bestTime! / 60).toFixed(2)} min</div>
          )}
        </div>
      </div>
    </div>
  );
}
