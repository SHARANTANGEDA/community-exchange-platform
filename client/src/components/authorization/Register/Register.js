import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getDepartments, registerUser } from '../../../actions/authActions'
import TextFieldGroup from '../../common/TextFieldGroup'
import DepartmentFeed from './DepartmentFeed'

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
    this.props.getDepartments(this.props.match.params.id);

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
    const {hod} = this.props;
    let showDepartments;
    if(hod.home===null || hod.loading) {
      showDepartments=null;
    }else {
      showDepartments = (
        <DepartmentFeed departments ={hod.home}/>
      )
    }
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
                <TextFieldGroup placeholder="Email Address" error={errors.emailId} info="Please use BITS Email for Registration"
                                type="email" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
                />
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
                      {showDepartments}
                    </select>
                    {errors.departmentName && (
                      <div className="invalid-feedback">{errors.departmentName}</div>
                    )}
                  </div>
                  <span className="focus-input100"/>
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
  getDepartments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  hod: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  hod: state.hod
})

export default connect(mapStateToProps,{registerUser,getDepartments})(withRouter(Register));