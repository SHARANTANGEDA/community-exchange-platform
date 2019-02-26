import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class TabPaneSwitch extends Component {
  render () {
    return (
      <div>
        <ul className="nav nav-tabs">
          <li className="active">
            <Link to="/myAccount" className="btn btn-primary"
                                       style={{margin: "10px"}}>MyAccount</Link>
          </li>
          <li>
            <Link data-toggle="tab" to="/changePassword" className="btn btn-primary"
                    style={{margin: "10px"}}> ResetPassword</Link>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(TabPaneSwitch)
