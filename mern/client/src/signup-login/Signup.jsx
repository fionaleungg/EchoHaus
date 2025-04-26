import React from 'react';

function Signup() {
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
    await fetch(`http://localhost:5050/api/v0/user`, {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className = "signup">
        <div className = "signin-card">
          <h1 className = "title">Sign Up</h1>
          <input className = "email" name="email" placeholder = "Email" type="email" onChange={handleInputChange}></input>
          <input className = "name" name="name" placeholder = "Name" type="text" onChange={handleInputChange}></input>
          <input className = "password" name="password" placeholder = "Password" type="password" onChange={handleInputChange}></input>
          <button className = "signup-button" onClick={signup}>
              SIGN UP
          </button>
        </div>
      </div>
    </>
  )

}

export default Signup;
