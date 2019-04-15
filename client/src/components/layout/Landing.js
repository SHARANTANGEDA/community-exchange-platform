import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class Landing extends Component {

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">GhotDen</h1>
                <p className="lead">
                  {' '}
                  Ask us Anything
                </p>
                <hr />
                {/*<Link to="/register" className="btn btn-lg btn-info mr-2">*/}
                  {/*Sign Up*/}
                {/*</Link>*/}
                {/*<Link to="/login" className="btn btn-lg btn-light">*/}
                  {/*Login*/}
                {/*</Link>*/}
                <Link to="/login" className="btn btn-lg btn-info mr-2">
                  <img src={require("../../img/student.png")} alt=""/>
                    <h6 style={{fontStyle: 'inherit', fontWeight: 'bold'}}>Student</h6>
                </Link>
                <Link to="/facultyLogin" className="btn btn-lg btn-info mr-2">
                  <img src={require("../../img/professor.png")} alt=""/>
                    <h6 style={{fontStyle: 'inherit', fontWeight: 'bold'}}>Faculty</h6>
                </Link>
                <Link to="/hodLogin" className="btn btn-lg btn-info mr-2">
                  <img src={require("../../img/hod.png")} alt=""/>
                    <h6 style={{fontStyle: 'inherit', fontWeight: 'bold'}}>HOD</h6>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
