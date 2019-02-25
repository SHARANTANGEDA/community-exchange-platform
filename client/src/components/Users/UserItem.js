
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';

class UserItem extends Component {
  render () {
    const {user} = this.props;
    const name = user.firstName+' '+user.lastName;
    return (
      <div className="col-md-4" style={{margin: '10px'}}>
        <img src={user.avatar} alt='http://pinegrow.com/placeholders/img19.jpg' style={{height: "40%", width: "70%"}}/>
        <h3><Link to="">{name}</Link></h3>
        <p>{user.emailId}</p>
        <p>{user.departmentName}</p>
      </div>
    )
  }
}

UserItem.propTypes = {
  user: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(UserItem);