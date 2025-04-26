import React from 'react';
import styles from '../styles/NavBar.module.css';
import circleLogo from '../assets/circleLogo.png';
import {useNavigate} from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <button className={styles.studyButton} onClick={() => navigate("/study")}>Study</button>
        <button className={styles.notesButton} onClick={() => navigate("/mynotes")}>My Notes</button>
      </div>
      <img src={circleLogo} alt="Logo" className={styles.logo} />
    </div>
  );  
}

export default NavBar;
