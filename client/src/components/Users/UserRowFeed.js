import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import UserRow from './UserRow'

class UserRowFeed extends Component {
  render() {
    const  {users}  = this.props;
    console.log({'User Feed':users});
    return users.map(user => (
      <UserRow users={user}/>
    ));
  }
}

UserRowFeed.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserRowFeed;
