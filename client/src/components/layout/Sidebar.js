import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Sidebar extends Component {
  render() {
    const {isAuthenticated} = this.props.auth;
    let showContent;
    if(isAuthenticated) {
      showContent=(
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{height: '100%'}}>
        <ul className="list-unstyled components"  style={{height: '100%'}}>
          <li className="active">
          </li>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-home"/>
              Home
            </Link>
            <Link to="/allQuestions">
              <i className="fas fa-question"/>
              All Questions
            </Link>
            <Link to="/allProfiles">
              <i className="fas fa-question"/>
              All Users
            </Link>
            <Link to="" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
              <i className="fas fa-copy"/>
              Tags
            </Link>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <Link to="">Course Tags</Link>
              </li>
              <li>
                <Link to="">Subject Tags</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="">
              <i className="fas fa-paper-plane"/>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      )
    }
    return (
      <div className='' style={{minHeight: '100%'}}>
        {showContent}
      </div>
    );
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(Sidebar);
