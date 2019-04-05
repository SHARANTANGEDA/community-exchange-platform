import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import classnames from 'classnames'
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import { addDepartment } from '../../actions/adminActions'

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
      errors: {},
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    if(this.props.admin.msg.success) {

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
    this.props.addDepartment(newUser,this.props.history);

  }

  render () {
    const { errors } = this.state
    let showSuccess = (
      <p style={{color: 'white',background: 'green'}} className='btn w-100'>Department Successfully Added</p>
    );
    return (
      <div className="addDepartment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {this.props.admin.msg.success ? showSuccess: null}
              <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                  className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">Add a new Department</h1>
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

                <TextFieldGroup placeholder="Email Address" error={errors.emailId} info="Please use BITS Email for Registration"
                                type="email" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
                />
                <TextFieldGroup placeholder="Password" error={errors.password}
                                type="password" onChange={this.changeHandler} value={this.state.password} name="password"
                />
                <TextFieldGroup placeholder="Confirm Password" error={errors.repassword}
                                type="password" onChange={this.changeHandler} value={this.state.repassword} name="repassword"
                />
                <TextFieldGroup placeholder="Enter Department Name" error={errors.departmentName}
                                type="text" onChange={this.changeHandler} value={this.state.departmentName} name="departmentName"
                />
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
  addDepartment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  errors: state.errors
})

export default connect(mapStateToProps,{addDepartment})(withRouter(Register));