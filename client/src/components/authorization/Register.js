import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import classnames from 'classnames'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions'

class Register extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      repassword: '',
      departmentName: 'Choose Department',
      errors: {}
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit (e) {
    e.preventDefault()
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
      password: this.state.password,
      repassword: this.state.repassword,
      departmentName: this.state.departmentName
    }
    this.props.registerUser(newUser,this.props.history);

  }

  render () {
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your GhotDen account</p>
              <form onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" className={classnames('form-control form-control-lg', { 'is-invalid': errors.firstName })}
                                                       placeholder="First Name" name="firstName"
                                                       value={this.state.firstName} onChange={this.changeHandler}/>
                      {errors.firstName && (
                        <div className="invalid-feedback">{errors.firstName}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input type="text" className={classnames('form-control form-control-lg',{'is-invalid': errors.lastName})}
                                                       placeholder="Last Name" name="lastName"
                                                       value={this.state.lastName} onChange={this.changeHandler}/>
                      {errors.lastName && (
                        <div className="invalid-feedback">{errors.lastName}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group mb-0 mt-0">
                    <div className="row">
                      <div className="col-md-9 pt-0 mb-0">
                        <div className="form-group">
                          <input type="email" className={classnames("form-control form-control-lg mt-0",{'is-invalid': errors.emailId})}
                                                           placeholder="Email Address" name="emailId"
                                                           value={this.state.emailId} onChange={this.changeHandler}/>
                          {errors.emailId && (
                            <div className="invalid-feedback">{errors.emailId}</div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-3"><Link className="btn btn-primary w-50 my-1" to="#">Verify</Link></div>
                    </div>
                  </div>
                  <small className="form-text text-muted mt-0">Please use BITS Email for Registration</small>
                </div>
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg",{'is-invalid': errors.password})}
                       placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler}/>
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg",{'is-invalid': errors.repassword})}
                     placeholder="Confirm Password" name="repassword" value={this.state.repassword} onChange={this.changeHandler}/>
                  {errors.repassword && (
                    <div className="invalid-feedback">{errors.repassword}</div>
                  )}
                </div>
                <div className="wrap-input100 input100-select form-group">
                  <div>
                    <select className={classnames("selection-2 form-control form-control-lg",{'is-invalid': errors.departmentName})}
                         name="departmentName" value={this.state.departmentName} onChange={this.changeHandler}>
                      <option>Choose Department</option>
                      <option>Computer Science Engineering</option>
                      <option>Electrical and Electronics Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Civil Engineering</option>
                    </select>
                    {errors.departmentName && (
                      <div className="invalid-feedback">{errors.departmentName}</div>
                    )}
                  </div>
                  <span className="focus-input100"></span>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{registerUser})(withRouter(Register));