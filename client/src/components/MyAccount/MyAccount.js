import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import { getMyAccount, updateProfile } from '../../actions/profileActions'
import InputGroup from '../common/InputGroup'
import TextFieldGroup from '../common/TextFieldGroup'

const isEmpty = require('./is-empty');

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      githubUsername: '',
      linkedIn: '',
      codeForces: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getMyAccount(this.props.match.params.id);
    console.log("Called DidMount in All Users");
  }
  componentWillReceiveProps(nextProps,nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;


      // If profile field doesnt exist, make empty string
      profile.githubUsername = !isEmpty(profile.githubUsername) ? profile.githubUsername : '';
      profile.linkedIn = !isEmpty(profile.linkedIn) ? profile.linkedIn : '';
      profile.codeForces = !isEmpty(profile.codeForces) ? profile.codeForces : '';

      // Set component fields state
      this.setState({
        githubUsername: profile.githubUsername,
        linkedIn: profile.linkedIn,
        codeForces: profile.codeForces
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      githubUsername: this.state.githubUsername,
      linkedIn: this.state.linkedIn,
      codeForces: this.state.codeForces
    };
    console.log({profileData})
    this.props.updateProfile(profileData, this.props.history);
    console.log("Profile Logged")

  }
  render() {
    const { errors } = this.state;
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div >
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-10" style={{fontFamily: "Lobster",color: 'black',fontSize:'48px'}}><h1>My Account</h1></div>
            </div>

            <div className="tab-content">
              <div className="tab-pane active" id="home">
                  <form className="form" onSubmit={this.onSubmit} method="post" id="registrationForm">
                    <div className="form-group">

                      <div className="col-xs-6" style={{border: '2px', borderStyle: 'groove',borderColor: 'blue',borderRadius:'5px', padding: '5px'}} >
                        <label htmlFor="first_name"><h6>First name</h6></label>
                        <input type="text" className="form-control" name="firstName"
                               title="enter your first name if any" value={profile.firstName} readOnly/>
                      </div>
                    </div>
                    <div className="form-group">

                      <div className="col-xs-6" style={{border: '2px', borderStyle: 'groove',borderColor: 'blue',borderRadius:'5px', padding: '5px'}}>
                        <label htmlFor="last_name"><h6>Last name</h6></label>
                        <input type="text" className="form-control" name="lastName"
                               title="enter your last name if any." value={profile.lastName} readOnly/>
                      </div>
                    </div>

                    <div className="form-group">

                      <div className="col-xs-6" style={{border: '2px', borderStyle: 'groove',borderColor: 'blue',borderRadius:'5px', padding: '5px'}}>
                        <label htmlFor="email"><h6>Email</h6></label>
                        <input type="email" className="form-control" name="emailId"
                               title="enter your email." value={profile.email} readOnly/>
                      </div>
                    </div>
                      <TextFieldGroup
                        placeholder="Code Forces Handle"
                        name="codeForces"
                        value={this.state.codeForces}
                        onChange={this.onChange}
                        error={errors.codeForces}
                        info="If you want the latest rank to be displayed"
                      />
                      <TextFieldGroup
                        placeholder="Github Username"
                        name="githubUsername"
                        value={this.state.githubUsername}
                        onChange={this.onChange}
                        error={errors.githubUsername}
                        info="If you want your latest repos and a Github link, include your username"
                      />
                    <div className={"form-group"}>
                      <InputGroup
                        placeholder="LinkedIn Profile URL"
                        name="linkedIn"
                        icon="fab fa-linkedin"
                        value={this.state.linkedIn}
                        onChange={this.onChange}
                        error={errors.linkedIn}
                      />
                    </div>
                    <div className="form-group">
                      <div className="col-xs-12">
                        <button className="btn btn-primary w-30 my-1" type="submit">Save</button>
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
        <div className="container bootstrap snippet myAccount" style={{maxWidth: '100%'}}>
          <div className="row" style={{maxWidth: '100%'}}>
          </div>
          {profileContent}
        </div>
    );
  }
}

MyAccount.propTypes = {
  getMyAccount: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getMyAccount,updateProfile })(MyAccount);
