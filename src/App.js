import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Header from './Components/Header'
import Dashboard from './Containers/Dashboard'
import Login from './Components/Login'
import Signup from './Components/Signup'
import TripShow from './Containers/TripShow'
import EncounterShow from './Containers/EncounterShow'


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
      this.props.history.push('/login')
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
        }), () => this.props.history.push('/dashboard'))
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
        }), () => this.props.history.push('/dashboard'))
      })
  }

  render() {
    return (
      <div id="app">
        {this.state.user ? <Header /> : null}
        <Switch>
          <Route
            path='/login'
            render={() => <Login loginHandler={this.loginHandler} />}
          />
          <Route
            path='/signup'
            render={() => <Signup signupHandler={this.signupHandler} />}
          />
          <Route
            path='/dashboard'
            render={() => {
              return this.state.user ?
                <Dashboard user={this.state.user} />
                : null
            }} />
          <Route path='/trip/:id' render={() => {
            return this.state.user ?
              <TripShow user={this.state.user} />
              : null
          }} />
          <Route path='/encounter/:id' render={() => <EncounterShow />} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(App)
