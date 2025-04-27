import styles from '../styles/Landing.module.css'
import notebook from '../assets/notebook.png'
import logo from '../assets/circleLogo.png';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.landing}>
      <img className={styles.notebook} src={notebook} />

      <div className={styles.right}>
        <motion.div
          className={styles.title}
          initial={{ opacity: 0, y: "100%" }}  // start from bottom of the screen
          animate={{ opacity: 1, y: 0 }}      // animate to its location
          transition={{ duration: 1 }}         // set animation duration
        >
          <div className={styles.echohaus}>EchoHaus</div>
          <div className={styles.welcome}>
            Forgetting is the best friend of memory.
            Based on the Ebbinghaus Forgetting Curve
          </div>
          <div className={styles.line}>
            ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
          </div>
        </motion.div>

        <div className={styles.topBar}>
          <div className={styles.logo}>
            <img className={styles.circleLogo} src={logo} />
            <h4 className={styles.smallerechohaus}>EchoHaus</h4>
          </div>
          <div className={styles.buttons}>
            <button className={styles.signin} onClick={() => navigate("/wiki")}>
              How It Works
            </button>
            <button className={styles.signin} onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button className={styles.signin} onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
