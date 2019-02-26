import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import { changeGithubUsername, getMyAccount } from '../../actions/profileActions'
import TabPaneSwitch from './TabPaneSwitch'

class MyAccount extends Component {
  constructor() {
    super();
    this.state = {
      githubUsername: {},
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
  }


  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps) {
      this.setState({ githubUsername: nextProps.githubUsername })
    }
  }
  componentDidMount() {
    this.props.getMyAccount(this.props.match.params.id);
    console.log("Called DidMount in All Users");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  clickReset(e) {
    this.setState({githubUsername: this.props.profile.githubUsername})
  }

  onSubmit(e) {
    e.preventDefault();
    const githubHandle = {
      githubUsername: this.state.githubUsername
    };
    this.props.changeGithubUsername(githubHandle);
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="col-sm-9">
            <TabPaneSwitch/>
            <div className="row">
              <div className="col-sm-10"><h2>My Account</h2></div>
              <div className="col-sm-2"><Link to="/" className="pull-right"/></div>
            </div>

            <div className="tab-content">
              <div className="tab-pane active" id="home">
                  <form className="form" onSubmit={this.onSubmit} method="post" id="registrationForm">
                    <div className="form-group">

                      <div className="col-xs-6">
                        <label htmlFor="first_name"><h6>First name</h6></label>
                        <input type="text" className="form-control" name="firstName"
                               title="enter your first name if any" value={profile.firstName} readOnly/>
                      </div>
                    </div>
                    <div className="form-group">

                      <div className="col-xs-6">
                        <label htmlFor="last_name"><h6>Last name</h6></label>
                        <input type="text" className="form-control" name="lastName"
                               title="enter your last name if any." value={profile.lastName} readOnly/>
                      </div>
                    </div>

                    <div className="form-group">

                      <div className="col-xs-6">
                        <label htmlFor="email"><h6>Email</h6></label>
                        <input type="email" className="form-control" name="emailId"
                               title="enter your email." value={profile.email} readOnly/>
                      </div>
                    </div>
                    <div className="form-group">

                      <div className="col-xs-6">
                        <label htmlFor="email"><h6>GitHub Account</h6></label>
                        <input type="text" name="gitname"
                               onChange={this.onChange.bind(this)}
                               className="form-control" autoFocus placeholder="enter github Handle"
                               defaultValue={this.props.profile.githubUsername}
                        value={this.state.githubUsername}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-12">
                        <button className="btn btn-primary w-30 my-1" type="submit">
                          <i className="glyphicon glyphicon-ok-sign"/> Save
                        </button>
                        <button className="btn btn-primary w-30 my-1" type="reset"
                                onClick={this.clickReset.bind(this)}>
                          <i className="glyphicon glyphicon-repeat"/> Reset
                        </button>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
        <div className="container bootstrap snippet myAccount">
          <div className="row">
          </div>
          {profileContent}
        </div>
    );
  }
}

MyAccount.propTypes = {
  getMyAccount: PropTypes.func.isRequired,
  changeGithubUsername: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getMyAccount,changeGithubUsername })(MyAccount);
