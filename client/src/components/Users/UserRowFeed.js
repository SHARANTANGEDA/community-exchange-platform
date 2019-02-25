import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import UserRow from './UserRow'

class UserRowFeed extends Component {
  render() {
    const  {users}  = this.props;
    console.log({'Feed':users});
    let i,j,subUsers,chunk = 3;
    for (i=0,j=users.length; i<j; i+=chunk) {
      subUsers = users.slice(i,i+chunk);
      // do whatever
    }
    return (
      <UserRow users={subUsers}/>
    )

  }
}

UserRowFeed.propTypes = {
  users: PropTypes.array.isRequired
};

export default UserRowFeed;
