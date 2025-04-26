import React from 'react';
import {useNavigate} from 'react-router-dom'

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
      <div>
          <div className = "signin-card">
            <h1 className = "title">Sign In</h1>
            <input name="email" className = "email" placeholder = "Email" type="email" onChange={handleInputChange}></input>
            <input name="password" className = "password" placeholder = "Password" type="password" onChange={handleInputChange}></input>
            {/* needs auth */}
            <button className = "signin-button" onClick={login}>
                SIGN IN
            </button>
            <h1>{username}</h1>
          </div>
      </div>
    </>
  )
}

export default Login;