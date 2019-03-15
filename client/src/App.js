import React, { Component } from 'react';
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions'

import PrivateRoute from './components/common/PrivateRoute';

import {Provider} from 'react-redux';
import store from './store';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Register from './components/authorization/Register';
import Login from './components/authorization/Login';
import Dashboard from './components/QuestionGet/Dashboard';
import AskQuestions from './components/AskQuestion/AskQuestions';
import Sidebar from'./components/layout/Sidebar';
import AllQuestions from './components/QuestionGet/AllQuestions'
import AllUsers from './components/Users/AllUsers'
import UserProfile from './components/Users/UserProfile'
import MyAccount from './components/MyAccount/MyAccount'
import ViewQuestion from './components/SingleQuestion/ViewQuestion'


//Check for token
if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    //  Clear current profile
    //store.dispatch(clearCurrentProfile());
    window.location.href = '/login'
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
          <div className="wrapper">
          <Sidebar/>
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard}/>
          </Switch>
            <Switch>
              <PrivateRoute exact path='/askQuestion' component={AskQuestions}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/allQuestions' component={AllQuestions}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/allProfiles' component={AllUsers}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/publicProfile/:id' component={UserProfile}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/myAccount' component={MyAccount}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path='/viewQuestion/:id' component={ViewQuestion}/>
            </Switch>

          </div>
        </div>
        <Footer/>
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
