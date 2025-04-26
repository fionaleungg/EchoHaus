import React from 'react'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

function Timer() {
  const [complete, setComplete] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const [time, setTime] = React.useState(15); // 15 minutes default
  const [play, setPlay] = React.useState(false);
  const duration = time ? (time * 60) : 900; // timer duration in seconds
  const colors=['#AFCAE4', '#9AB8D7', '#86A5CA', '#7292BD', '#5E7FB0', '#4A6CA3', '#365996', '#24477D', '#123564']
  const colorsTime = colors.map((_, index) => {
    return duration - (index + 1) * (duration / colors.length);
  });
  const handleReset = () => {
    setKey(prevKey => prevKey + 1); // Changing key will reset timer
    setPlay(false);
    setComplete(false);
  };
  return (
    <>
      <CountdownCircleTimer
        key={key}
        isPlaying={play}
        duration={duration}
        colors={colors}
        colorsTime={colorsTime}
        strokeWidth={25}
        onComplete={() => {
          setPlay(false);
          setComplete(true);
        }}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;

          return (
            <div>{minutes}:{seconds.toString().padStart(2, '0')}</div>);
        }}
      </CountdownCircleTimer>
      <span>
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
      minutes
      </span>
      <div>
        <button onClick={() => setPlay(!play)}>{play ? `pause` : `start`}</button>
        <button onClick={handleReset}>reset</button>
      </div>
      {complete && <div>
        finished!
        <button>go to recall</button>
      </div>}
    </>
  )
}

export default Timer;