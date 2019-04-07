import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Sidebar extends Component {
  render() {

    const {isAuthenticated,user} = this.props.auth;
    console.log({side:user})
    let showContent;
    if(isAuthenticated && user.role==='student') {
      showContent=(
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{height: '100%'}}>
        <ul className="list-unstyled components"  style={{height: '100%'}}>
          <li className="active">
          </li>
          <li>
            <Link to="/dashboard" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-home"/>
              Home
            </Link>
            <Link to="/allQuestions" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-question"/>
              All Questions
            </Link>
            <Link to="/allProfiles" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-question"/>
              All Users
            </Link>
            <Link to="" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-copy"/>
              Tags
            </Link>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <Link to="" style={{textDecoration: 'none',color: 'black'}}>Course Tags</Link>
              </li>
              <li>
                <Link to="" style={{textDecoration: 'none',color: 'black'}}>Subject Tags</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-paper-plane"/>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      )
    } else if(isAuthenticated && user.role==='faculty') {
      showContent=(
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{height: '100%'}}>
        <ul className="list-unstyled components"  style={{height: '100%'}}>
          <li className="active">
          </li>
          <li>
            <Link to="/dashboard" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-home"/>
              Home
            </Link>
            <Link to="/allQuestions" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-question"/>
              All Questions
            </Link>
            <Link to="/allProfiles" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-question"/>
              All Users
            </Link>
            <Link to="/taApplications" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-question"/>
              TA Applications
            </Link>
            <Link to="" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-copy"/>
              Tags
            </Link>
            <ul className="collapse list-unstyled" id="pageSubmenu">
              <li>
                <Link to="" style={{textDecoration: 'none',color: 'black'}}>Course Tags</Link>
              </li>
              <li>
                <Link to="" style={{textDecoration: 'none',color: 'black'}}>Subject Tags</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-paper-plane"/>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
      )
    } else if(isAuthenticated && user.role==='hod') {
      showContent=(
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{height: '100%'}}>
        <ul className="list-unstyled components"  style={{height: '100%'}}>
          <li className="active">
          </li>
          <li>
            <Link to="/hodDashboard" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-home"/>
              Home
            </Link>
          </li>
          <li>
            <Link to="/allProfiles" style={{textDecoration: 'none',color: 'black'}}>
              <i className="fas fa-question"/>
              All Users
            </Link>
          </li>
          <li>
            <Link to="" style={{textDecoration: 'none',color: 'black'}}>
              UnAssigned Faculty
            </Link>
          </li>
          <li>
          <Link to="/allCourses" style={{textDecoration: 'none',color: 'black'}}>
              All Courses
            </Link>
          </li>
          <li>
          <Link to="" style={{textDecoration: 'none',color: 'black'}}>
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
