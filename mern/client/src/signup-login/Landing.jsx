import '../styles/Landing.css'
import nerdImg from '../assets/notebook.png'
// import {useNavigate} from 'react-router-dom';

function Landing() {
//   const [count, setCount] = useState(0)

//   const navigate = useNavigate();
  return (
    <div className = "landing">
      <img src={nerdImg} />

      <div className = "right">
        <div className = "landing-title">
            <div className = "welcome">Welcome to</div>
            <div className = "app-name">EchoHaus</div>
        </div>
        
        <div className = "buttons">
            {/* <button className = "signin" onClick={() => navigate("/login")}> */}
            <button className = "signin">
                SIGN IN
            </button>
            {/* <button className= "signin" onClick={() => navigate("/signup")}> */}
            <button className= "signin">
                SIGN UP
            </button>
        </div>
      </div>
    </div>
  )
}

export default Landing