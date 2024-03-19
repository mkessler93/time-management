import React, { useState, useRef } from 'react';

function Timer() {
  const [timer, setTimer] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  
  // useRef allows us to persist the value between renders
  const intervalRef = useRef();
  const date = new Date()

  const startTimer = () => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => prevTimer + 60);
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimer(0);
  };

  const formatTime = (time) => {
    //convert sec to hours and minutes
    const hours = Math.floor(time / 3600);
    const min = Math.floor((time % 3600) / 60);
    // pad with zero if the number is below 10 
    const formattedHours = String(hours).padStart(2, '0')
    const formattedMin = String(min).padStart(2,'0')

    return `${formattedHours}:${formattedMin}`

  }

  return (
    <div className="App">
      <h1>Welcome</h1>
      <p>{date.toLocaleDateString()}</p>
      {<p>{formatTime(timer)}</p>}
      <div>
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <>
            <button onClick={pauseTimer}>Pause</button>
            <button onClick={stopTimer}>Stop</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Timer;
