import React,{Component} from 'react';

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
  onSubmit(e) {
    e.preventDefault();
    const user = {
      emailId: this.state.emailId,
      password: this.state.password
    };
    console.log(user);
  }
  render () {
    return(
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your GhotDen account</p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email Address"
                           name="emailId" value={this.state.emailId} onChange={this.changeHandler}/>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password"
                           name="password" value={this.state.password} onChange={this.changeHandler}/>
                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Login;