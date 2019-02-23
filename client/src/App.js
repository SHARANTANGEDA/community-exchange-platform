import React, { Component } from 'react';
import './App.css';
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/authorization/Register'
import Login from './components/authorization/Login'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <NavBar/>
        <Route exact path="/" component={Landing}/>
        <div className="container">
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </div>
        <Footer/>
      </div>
      </Router>
    );
  }
}

export default App;
