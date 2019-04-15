import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import { getProfileById } from '../../actions/profileActions'
import QuestionsFeed from '../QuestionGet/QuestionsFeed'

class UserProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getProfileById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps,nextContext) {
    if (nextProps.profile === null && this.props.profile.loading) {
      this.props.history.push('/dashboard');
      //TODO ADD  not found
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    console.log({Profile:profile,Loading: loading})
    let profileContentI;
    let profileContentII;
    if (profile === null || loading ) {
      profileContentI = <Spinner/>
      profileContentII = null;
    } else {
      let fullName = profile.user.firstName + ' ' + profile.user.lastName;
      console.log({repu: profile.user.reputation})
      profileContentI = (
        <table className="table profile__table">
        <tbody>
        <tr>
          <th><strong>Full Name</strong></th>
          <td>{fullName}</td>
        </tr>
        <tr>
          <th><strong>Email</strong></th>
          <td>{profile.user.emailId}</td>
        </tr>
        <tr>
          <th><strong>GitHub</strong></th>
          <td>{profile.user.githubUsername}</td>
        </tr>
        <tr>
          <th><strong>Reputations</strong></th>
          <td>{profile.user.reputation}</td>
        </tr>
        </tbody>
        </table>
      )
      profileContentII = (
        <QuestionsFeed questions={profile.questions}/>
      )
    }

    return (
      <div className='publicProfile'>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-9">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">User info</h4>
                </div>
                <div className="panel-body">
                    {profileContentI}
                </div>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Asked Questions</h4>
                </div>
                <div className="comments">
                  <div className="card card-body mb-3">
                    {profileContentII}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


UserProfile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(UserProfile);
