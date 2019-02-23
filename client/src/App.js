import React, { Component } from 'react';
import './App.css';
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <NavBar/>
        <Landing/>
        <Footer/>
      </div>
      </Router>
    );
  }
}

export default App;
