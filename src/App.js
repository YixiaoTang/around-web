import React, { Component } from 'react';
import {TopBar} from './TopBar';
import './App.css';
import {Register} from './Registration';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar/>
        <Register/>
      </div>
    );
  }
}

export default App;
