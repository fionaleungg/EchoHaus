import React from 'react'
import styles from '../styles/Feedback.module.css'
import LogoutButton from '../signup-login/LogoutButton';
import {useNavigate, useLocation} from 'react-router-dom';

function Feedback() {
  const navigate = useNavigate();
  return (
    <div className = {styles.feedback}>
      <div className = {styles.container}>
        <h2 className={styles.phase}>Phase 4</h2>
        <h1 className={styles.title}>Feedback</h1>
        <div className={styles.notebook}>
        <div className={styles.textcontainer}>
            <div className={styles.text}>feedback from gemini goes here</div>
        </div>
        </div>
        <LogoutButton />
        <div className = {styles.buttons}>
            <button className={styles.button} onClick={() => navigate("/intermission")}>Repeat</button>
            <button className={styles.button} onClick={() => navigate("/study")}>I need to study more</button>
          </div>
      </div>
    </div>
  )
}

export default Feedback;