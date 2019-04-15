import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class TabPaneSwitch extends Component {
  render () {
    return (
      <ul className="nav justify-content-center nav-pills">
        <li className="nav-item">
          <Link className="nav-link active" to="/myAccount">My Account</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link " to="/changePassword">Change Password</Link>
        </li>
      </ul>
    )
    // return (
    //   <div className="card card-nav-tabs card-plain">
    //     <div className="card-header card-header-danger" style={{background: 'blue'}}>
    //       <div className="nav-tabs-navigation" >
    //         <div className="nav-tabs-wrapper">
    //           <ul className="nav nav-tabs" data-tabs="tabs">
    //             <li className="nav-item">
    //               <Link className="nav-link active" to="/myAccount">My Account</Link>
    //             </li>
    //             <li className="nav-item">
    //               <Link className="nav-link" to="/changePassword">Change Password</Link>
    //             </li>
    //
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //     //{ colors: "header-primary", "header-info", "header-success", "header-warning", "header-danger" --}
    //
    //       )
  }
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(TabPaneSwitch)
