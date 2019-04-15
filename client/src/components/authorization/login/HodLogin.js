import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TextFieldGroup from '../../common/TextFieldGroup'
import { hodLogin } from '../../../actions/authActions'

class Login extends Component{
  constructor () {
    super();
    this.state = {
      emailId: '',
      password: '',
      errors: {}
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount () {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if(nextProps) {
      this.setState({errors: nextProps.errors})
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      emailId: this.state.emailId,
      password: this.state.password
    };
    this.props.hodLogin(userData);
  }
  render () {
    const {errors} = this.state;
    return(
      <div className="hodLogin">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your GhotDen account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup placeholder="Email Address" error={errors.emailId}
                                type="email" onChange={this.changeHandler} value={this.state.emailId} name="emailId"
                />
                <TextFieldGroup placeholder="Password" error={errors.password}
                                type="password" onChange={this.changeHandler} value={this.state.password} name="password"
                />
                <input type="submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Login.propTypes = {
  hodLogin:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{hodLogin})(Login);