import React from 'react';
import Dashboard from './Containers/Dashboard'
import Login from './Components/Login'
import Signup from './Components/Signup'


import './App.css';
class App extends React.Component {

  state = {
    user: ""
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      fetch('http://localhost:3000/api/v1/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => resp.json())
        .then(userData => {
          this.setState(() => ({
            user: userData.user
          }))
        })
    } else {
      console.log('Log in yo')
    }
  }

  loginHandler = (userInfo) => {
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    }
    fetch('http://localhost:3000/api/v1/login', configObj)
      .then(resp => resp.json())
      .then(userData => {
        localStorage.setItem("token", userData.jwt);
        this.setState(() => ({
          user: userData.user
        }), () => this.props.history.push())
      })
  }

  signupHandler = (userInfo) => {
    const configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    }
    fetch('http://localhost:3000/api/v1/users', configObj)
      .then(resp => resp.json())
      .then(userData => {
        localStorage.setItem("token", userData.jwt);
        this.setState(() => ({
          user: userData.user
        }))
      })
  }

  render() {
    return (
      <div id="app">
        <Login loginHandler={this.loginHandler} />
        <Signup signupHandler={this.signupHandler} />
        <Dashboard user={this.state.user} />
      </div>
    )
  }
}
export default App
