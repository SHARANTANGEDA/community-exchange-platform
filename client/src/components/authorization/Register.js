import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import classnames from 'classnames'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup';

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
              <form noValidate onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="First Name" error={errors.firstName}
                      type="text" onChange={this.changeHandler} value={this.state.firstName} name="firstName"
                    />
                  </div>
                  <div className="col-md-6">
                      <TextFieldGroup placeholder="Last Name" error={errors.lastName}
                                      type="text" onChange={this.changeHandler} value={this.state.lastName} name="lastName"
                      />

                  </div>
                </div>
                  <div className="form-group mb-0 mt-0">
                    <div className="row">
                      <div className="col-md-9 pt-0 mb-0">
                        <TextFieldGroup placeholder="Email Address" error={errors.emailId} info="Please use BITS Email for Registration"
                                        type="email" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
                        />
                      </div>
                      <div className="col-md-3"><Link className="btn btn-primary w-50 my-1" to="#">Verify</Link></div>
                    </div>
                  </div>
                <TextFieldGroup placeholder="Password" error={errors.password}
                                type="password" onChange={this.changeHandler} value={this.state.password} name="password"
                />
                <TextFieldGroup placeholder="Confirm Password" error={errors.repassword}
                                type="password" onChange={this.changeHandler} value={this.state.repassword} name="repassword"
                />
                <div className="wrap-input100 input100-select form-group">
                  <div>
                    <select className={classnames("selection-2 form-control form-control-lg",{'is-invalid': errors.departmentName})}
                         name="departmentName" value={this.state.departmentName} onChange={this.changeHandler}>
                      <option>Choose Department</option>
                      <option>Computer Science Engineering</option>
                      <option>Electrical and Communications Engineering</option>
                      <option>Electrical and Electronics Engineering</option>
                      <option>Electronics and Instrumentation Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Chemical Engineering</option>
                      <option>Civil Engineering</option>
                      <option>Manufacturing Engineering</option>
                      <option>Msc.Biological Sciences</option>
                      <option>Msc.Chemistry</option>
                      <option>Msc.Economics</option>
                      <option>Msc.Mathematics</option>
                      <option>Msc.Physics</option>
                      <option>B-Pharmacy</option>
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