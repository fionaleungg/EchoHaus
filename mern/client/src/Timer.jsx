import React from 'react'
import styles from './styles/Timer.module.css'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'
import LogoutButton from './signup-login/LogoutButton';

function Timer() {
  const [complete, setComplete] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const [time, setTime] = React.useState(); // 15 minutes default
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
    <div className = {styles.intermission}>
      <h2 className={styles.phase}>Phase 2</h2>
      <h1 className={styles.title}>Intermission</h1>
      <div className={styles.timerWrapper}>
  <CountdownCircleTimer
    size={300}
    key={key}
    isPlaying={play}
    duration={duration}
    colors={colors}
    colorsTime={colorsTime}
    strokeWidth={45}
    onComplete={() => {
      setPlay(false);
      setComplete(true);
    }}
  >
    {({ remainingTime }) => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      return (
        <div className={styles.timerContent}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </div>
      );
    }}
  </CountdownCircleTimer>
</div>

      <span>
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)}
      className = {styles.minuteInput} placeholder='Time in Minutes'/>
      minutes
      </span>
      <div className = {styles.buttons}>
        <button className = {styles.button} onClick={() => setPlay(!play)}>{play ? `Pause` : `Start`}</button>
        <button className = {styles.button} onClick={handleReset}>Reset</button>
      </div>
      {complete && <div>
        finished!
        <button>go to recall</button>
      </div>}
      <LogoutButton />
    </div>
  )
}

export default Timer;