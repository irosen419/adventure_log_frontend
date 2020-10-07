import React from 'react';
import Dashboard from './Containers/Dashboard'
import Login from './Components/Login'
import Signup from './Components/Signup'


import './App.css';
class App extends React.Component {

  state = {
    user: { id: 1, username: 'ian' }
  }

  render() {
    return (
      <div id="app">
        <Login />
        <Signup />
        <Dashboard user={this.state.user} />
      </div>
    )
  }
}
export default App
