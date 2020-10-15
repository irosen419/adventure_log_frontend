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
    user: "",
    currentUserFollowings: []
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
        localStorage.setItem("username", userData.user.username)
        localStorage.setItem("userId", userData.user.id);
        this.setState(() => ({
          user: userData.user
        }), () => this.props.history.push(`/dashboard/${this.state.user.id}`))
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
        localStorage.setItem("username", userData.user.username)
        localStorage.setItem("userId", userData.user.id)
        this.setState(() => ({
          user: userData.user
        }), () => this.props.history.push(`/dashboard/${this.state.user.id}`))
      })
  }

  checkForUser = () => {
    return this.state.user && this.state.currentUserFollowings.length === 0 ? this.fetchCurrentFollowings() : null
  }

  fetchCurrentFollowings = () => {
    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}/followings`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
    })
      .then(resp => resp.json())
      .then((users) => this.setState({ currentUserFollowings: users.followings }))
  }

  friend = (options) => {
    fetch(`http://localhost:3000/api/v1/friendship`, options)
      .then(resp => resp.json())
      .then((user) => this.setState((previousState) => ({ currentUserFollowings: [...previousState.currentUserFollowings, user.user] })))
  }

  unfriend = (options, followingId) => {
    console.log('unfriend')
    localStorage.setItem("userId", this.state.user.id)
    localStorage.setItem("username", this.state.user.username)
    fetch(`http://localhost:3000/api/v1/unfriend`, options)
      .then(resp => resp.json())
      .then(() => {
        let newArray = this.state.currentUserFollowings
        let foundUser = newArray.find(user => user.id.toString() === followingId)
        newArray.splice(newArray.indexOf(foundUser), 1)
        this.setState(() => ({ currentUserFollowings: newArray }))
      })
  }

  friendHandler = (e) => {

    const userId = this.state.user.id
    const followingId = window.location.pathname.split('/')[2]

    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-type': 'application/json',
        'Accepts': 'application/json',
      },
      body: JSON.stringify({ friendship: { follower_id: userId, following_id: followingId } })
    }
    e.target.innerText === 'Follow' ? this.friend(options) : this.unfriend(options, followingId)
  }

  render() {
    { this.checkForUser() }
    return (
      <div id="app">
        {this.state.user ? <Header user={this.state.user} /> : null}
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
            path='/dashboard/:id'
            render={() => {
              return this.state.user ?
                <Dashboard user={this.state.user} followings={this.state.currentUserFollowings} friendHandler={this.friendHandler} />
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
