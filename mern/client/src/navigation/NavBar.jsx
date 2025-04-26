import React from 'react';
import styles from '../styles/NavBar.module.css';
import circleLogo from '../assets/circleLogo.png';

function NavBar() {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <button className={styles.studyButton}>Study</button>
        <button className={styles.notesButton}>My Notes</button>
      </div>
      <img src={circleLogo} alt="Logo" className={styles.logo} />
    </div>
  );  
}

export default NavBar;
