import React from 'react';
import Dashboard from './Containers/Dashboard'
import Login from './Components/Login'
import Signup from './Components/Signup'


import './App.css';
class App extends React.Component {

  render() {
    return (
      <div id="app">
        <Login />
        <Signup />
        <Dashboard />
      </div>
    )
  }
}
export default App
