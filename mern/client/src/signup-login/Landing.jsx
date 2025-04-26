import styles from '../styles/Landing.module.css'
import notebook from '../assets/notebook.png'
import {useNavigate} from 'react-router-dom';

function Landing() {
//   const [count, setCount] = useState(0)

  const navigate = useNavigate();
  return (
    <div className = {styles.landing}>
      <img className = {styles.notebook} src={notebook} />

      <div className = {styles.right}>
        <div className = {styles.title}>
            <div className = {styles.welcome}>Welcome to</div>
            <div className = {styles.echohaus}>EchoHaus</div>
        </div>
        
        <div className = {styles.buttons}>
            <button className = {styles.signin} onClick={() => navigate("/login")}>
                Sign In
            </button>
            <button className= {styles.signin} onClick={() => navigate("/signup")}>
                Sign Up
            </button>
        </div>
      </div>
    </div>
  )
}

export default Landing