import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import UserItem from './UserItem'

class UserRow extends Component {
  render () {
    const {users,auth} = this.props;
    let userO,user1,user2;
      if(users[0]._id===null) {
        userO = (null);
      } else {
        userO = (<UserItem user={users[0]} key={users[0]._id}/>)

      }
    if(users[1]._id===null) {
      user1 = null;
    } else {
      user1=(<UserItem user={users[1]} key={users[1]._id}/>)
    }
    if(users[2]._id===null) {
      user2 = null;
    } else {
      user2=(<UserItem user={users[2]} key={users[2]._id}/>)
    }

    return (
      <div className="row" style={{height: "20%", width: "100%",minWidth: "81%"}}>
        {userO}
        {user1}
        {user2}
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
