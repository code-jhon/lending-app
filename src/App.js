import React, { Component } from 'react';
import './App.css';

import Login from './components/login/login'

class App extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }
}

export default App; 
