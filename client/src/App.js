import React, { Component } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser} from './actions/authActions';

import {Provider} from 'react-redux';
import store from './store';
import Footer from './components/layout/Footer'
import NavBar from './components/layout/NavBar'
import Landing from './components/layout/Landing'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Register from './components/authorization/Register'
import Login from './components/authorization/Login'


//Check for token
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //store.dispatch(logoutUser());
    // TODO Clear current profile
    //store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
