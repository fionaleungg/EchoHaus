import React from 'react';
import styles from '../styles/NavBar.module.css';
import circleLogo from '../assets/circleLogo.png';
import {useNavigate, useLocation} from 'react-router-dom';
import NoteContext from '../notes/NoteContext';

function NavBar() {
  const ntx = React.useContext(NoteContext);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <button className={styles.studyButton} onClick={() => navigate("/study")}>Study</button>
        {location.pathname == "/study" && ntx.currentNote && <div className={styles.studyname}>
            Currently Studying: {ntx.currentNote.name}
          </div>}
        <button className={styles.notesButton} onClick={() => navigate("/mynotes")}>My Notes</button>
      </div>
      <img src={circleLogo} alt="Logo" className={styles.logo} />
    </div>
  );  
}

export default NavBar;
