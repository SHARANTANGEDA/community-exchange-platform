import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import UserRowFeed from './UserRowFeed';
import {getAllProfiles} from '../../actions/profileActions'

class AllUsers extends Component {

  componentDidMount () {
    this.props.getAllProfiles(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { users, loading} = this.props.profile
    let allUserContent;
    if ((users === null) || loading ) {
      allUserContent = <Spinner/>
    } else {
      allUserContent = (
          <UserRowFeed users={users}/>
      )
    }

    return (
      <div className='/allProfiles'>
      <div id="content" className="snippet-hidden" style={{position: "relative"}}>
        <h1 style={{position: "relative"}}>All Users:</h1>
        <div className="container" style={{position: "relative", width: "90%",minWidth: "81%", height: "86%"}}>
          {allUserContent}
      </div>
      </div>
      </div>
      )
  }
}

AllUsers.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles })(AllUsers)
