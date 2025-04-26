import '../styles/Landing.css'
import notebook from '../assets/notebook.png'
import {useNavigate} from 'react-router-dom';

function Landing() {
//   const [count, setCount] = useState(0)

  const navigate = useNavigate();
  return (
    <div className = "landing">
      <img className = "notebook" src={notebook} />

      <div className = "right">
        <div className = "landing-title">
            <div className = "welcome">Welcome to</div>
            <div className = "app-name">EchoHaus</div>
        </div>
        
        <div className = "buttons">
            <button className = "signin" onClick={() => navigate("/login")}>
                Sign In
            </button>
            <button className= "signin" onClick={() => navigate("/signup")}>
                Sign Up
            </button>
        </div>
      </div>
    </div>
  )
}

export default Landing