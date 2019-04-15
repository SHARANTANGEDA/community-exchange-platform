import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { getDepartments, googleRegister } from '../../../actions/authActions'
import TextFieldGroup from '../../common/TextFieldGroup'
import DepartmentFeed from './DepartmentFeed'

class GoogleRegister extends Component {
  constructor () {
    super()
    this.state = {
      lastName: '',
      emailId: '',
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
  componentWillMount () {

  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit (e) {
    e.preventDefault()
    const newUser = {
      lastName: this.state.lastName,
      emailId: this.state.emailId,
      departmentName: this.state.departmentName
    }
    this.props.googleRegister(newUser);

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
      <div className="completeRegistration">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Give Us Some More information to Help you in a better way</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup placeholder="Last Name" error={errors.lastName}
                                type="text" onChange={this.changeHandler} value={this.state.lastName} name="lastName"
                                info="If this is empty your google display name alone will be used"
                />
                <TextFieldGroup placeholder="Email Address" error={errors.emailId} info="Please use BITS Email for Registration"
                                type="email" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
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

GoogleRegister.propTypes = {
  googleRegister: PropTypes.func.isRequired,
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

export default connect(mapStateToProps,{googleRegister,getDepartments})(withRouter(GoogleRegister));