import React, { Component } from 'react';
import {TopBar} from './TopBar';
import '../styles/App.css';
import {Register} from './Registration';
import {Main} from'./Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar/>
        <Main/>
      </div>
    );
  }
}

export default App;