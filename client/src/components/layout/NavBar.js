import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions'

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const {isAuthenticated,user} = this.props.auth;
    console.log({isAuthenticated: isAuthenticated,User:user});
    const authLinkO = (
      <Link className="navbar-brand" to="/dashboard">
        <img className="img-rounded" style={{maxWidth: '25%'}}
             src={require('../../img/logoNew.png')} alt="GhotDen"
             title=""/>
      </Link>
    );
    const guestLinkO = (
      <Link className="navbar-brand" to="/">
        <img className="img-rounded" style={{maxWidth: '25%'}}
             src={require('../../img/logoNew.png')} alt="GhotDen"
             title=""/>
      </Link>
    );

    const authLinksI = (
    <div className="input-group md-form form-sm form-2 pl-0" style={{maxWidth: '750px'}}>
      <input className="form-control my-0 py-1 lime-border" type="text" placeholder="Search" aria-label="Search"/>
      <div className="input-group-append">
        <span className="input-group-text cyan lighten-2" id="basic-text1">
          <i className="fas fa-search text-grey" aria-hidden="true"/>
        </span>
      </div>
    </div>
    );
    const authLinksII = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to={`/myAccount`}>
            My Account
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login" onClick={this.onLogoutClick.bind(this)}>
            <img className="rounded-circle" style={{width: '25px',marginRight:'5px'}}
                 src={user.avatar} alt={user.firstName}
                 title=""/>
                 {' '} Logout
          </Link>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/adminLogin">
            Admin Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          {isAuthenticated ? authLinkO : guestLinkO}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {isAuthenticated ? authLinksI: guestLinks}
            {isAuthenticated ? authLinksII : null}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,

})


export default connect(mapStateToProps,{logoutUser})(Navbar);
