import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../common/TextFieldGroup'
import { addDepartment } from '../../actions/adminActions'

class AddDepartment extends Component {
  constructor () {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      emailId: '',
      password: '',
      repassword: '',
      departmentName: '',
      errors: {}
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeHandler (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {

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
    return (
      <div className="addDepartment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <div className='row text-center'>
                <div className='col-md-8'>
                  <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                      className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">Add a new Department</h1>
                </div>
                <div className='col-md-1 align-center'>
                  <Link className="btn-primary btn btn-lg" to='/allDepartments' style={{minWidth:'220px'}}>View Departments</Link>
                </div>

              </div>
              <form  onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="Hod First Name" error={errors.firstName}
                                    type="text" onChange={this.changeHandler} value={this.state.firstName} name="firstName"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="Hod Last Name" error={errors.lastName}
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

AddDepartment.propTypes = {
  addDepartment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{addDepartment})(AddDepartment);