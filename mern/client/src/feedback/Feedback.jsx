import React from 'react'
import styles from '../styles/Feedback.module.css'

function Feedback() {
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
        {/* <LogoutButton /> */}
        <button className={styles.repeatButton}>
          Repeat
        </button>
      </div>
    </div>
  )
}

export default Feedback;