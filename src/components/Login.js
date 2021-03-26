import React, { useState } from "react";
import axios from 'axios';
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialLogin = {
    credentials: {
      username: '',
      password: '',
      error: '',
    }
  }
  const [state, setState] = useState(initialLogin)
  const handleChange = e => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = e => {
    axios
      .post('http://localhost:5000/api/login', state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        window.location.href = '/bubblepage'
      })
      .catch(err => {
        console.log(err)
        setState({ ...state, error: "Username or password is invalid" })
      })
  }
  // const error = "";
  // //replace with error state



  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='username'
            onChange={handleChange}
            value={state.credentials.username}
          >
          </input>
          <input
            type='password'
            name='password'
            onChange={handleChange}
            value={state.credentials.password}
          >
          </input>
          <button>login</button>
          {state.credentials.error && <p>{state.credentials.error}</p>}
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{state.credentials.error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.