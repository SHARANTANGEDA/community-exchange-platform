import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import UserItem from './UserItem'

class UserRow extends Component {
  render () {
    const {users} = this.props;
    let showUsers = ( users.map(user => (
      <UserItem user={user} key={user._id}/>
    )));
    return (
      // style={{height: "20%", width: "100%",minWidth: "100%"}}   d-flex flex-grow-1
      <div className="row" >
        {showUsers}
      </div>
    )
  }
};

UserRow.defaultProps = {
  showActions: true
}
UserRow.propTypes = {
  users: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(UserRow);
