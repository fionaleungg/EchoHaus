import React from 'react'
import RecallContext from './RecallContext'
import styles from '../styles/RecallInput.module.css'
import LogoutButton from '../signup-login/LogoutButton';
import {useNavigate, useLocation} from 'react-router-dom';

function RecallInput() {
  const rtx = React.useContext(RecallContext);
  const [curInput, setCurInput] = React.useState("");
  const navigate = useNavigate();
  
  const buttonClicked = () => {
    rtx.setCurrentRecall(curInput);
    console.log("hi");
    navigate("/feedback");
  };

  return (
    // <div className = {styles.recallInput}>
    //   <input type="text" onChange={(e) => setCurInput(e.target.value)} />
    //   <button onClick={() => rtx.setCurrentRecall(curInput)}>Submit Recall</button>
    // </div>
    <div className = {styles.recallInput}>
      <div className = {styles.container}>
        <h2 className={styles.phase}>Phase 3</h2>
        <h1 className={styles.title}>Recall</h1>
        <div className={styles.notebook}>
          <textarea className = {styles.inputfield} type="text"
          onChange={(e) => setCurInput(e.target.value)}
          placeholder = "Recall and summarize your understanding here"/>
        </div>
        <LogoutButton />
        <button className={styles.submitButton} onClick={buttonClicked}>Submit Recall</button>
      </div>
    </div>
  )
}

export default RecallInput;