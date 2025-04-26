import React from 'react';
import styles from '../styles/Login.module.css'
import circleLogo from '../assets/circleLogo.png'

function Login() {
  const [username, setUserName] = React.useState("");
  const [credentials, setCredentials] =
      React.useState({email: '', password: ''});
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const login = async () => {
    localStorage.removeItem('token');
    await fetch(`http://localhost:5050/api/v0/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('token', json.accessToken);
        setUserName(json.name);
      })
      .catch((err) => {
        alert("Error logging in");
        console.log(err);
      });
  };

  // const navigate = useNavigate();
  return (
    <>
      <div className = {styles.login}>
          <div className = {styles.signin}>
            <img className = {styles.circleLogo} src={circleLogo} />
            <h1 className = {styles.title}>Sign In</h1>
            <div className = {styles.content}>
                <input name="email" className = {styles.inputfield} placeholder = "Email" type="email" onChange={handleInputChange}></input>
                <input name="password" className = {styles.inputfield} placeholder = "Password" type="password" onChange={handleInputChange}></input>
                {/* needs auth */}
                <button className = {styles.SIbutton} onClick={login}>
                    Sign In
                </button>
            </div>
            <h1 className = {styles.deez}>{username}</h1>
          </div>
      </div>
    </>
  )
}

export default Login;