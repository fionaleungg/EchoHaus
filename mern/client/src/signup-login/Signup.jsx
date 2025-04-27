import React from 'react';
import styles from '../styles/Signup.module.css'
import circleLogo from '../assets/circleLogo.png'
import fish from '../assets/fish.png'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] =
    React.useState({email: '', password: '', name: ''});
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const signup = async (event) => {
    localStorage.removeItem('token');
    await fetch(`https://echohaus-backend.onrender.com/api/v0/user`, {
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
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className = {styles.signup}>
        <div className = {styles.card}>
        <img className = {styles.circleLogo} src={circleLogo} />
          <div className = {styles.fishies}>
            <img className = {styles.fish1} src={fish} />
            <h1 className = {styles.title}>Sign Up</h1>
            <img className = {styles.fish2} src={fish} />
          </div>
          <div className = {styles.content}>
            <input className = {styles.inputfield} name="email" placeholder = "Email" type="email" onChange={handleInputChange}></input>
            <input className = {styles.inputfield} name="name" placeholder = "Name" type="text" onChange={handleInputChange}></input>
            <input className = {styles.inputfield} name="password" placeholder = "Password" type="password" onChange={handleInputChange}></input>
            <button className = {styles.SUbutton} onClick={signup}>
                Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  )

}

export default Signup;
