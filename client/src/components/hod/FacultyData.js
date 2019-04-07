import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class FacultyData extends Component {
  render () {
    const { faculty } = this.props
    console.log({ GetFaculty: faculty })
    const name = faculty.firstName + ' ' + faculty.lastName
    return (
      <tr className="odd">
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{name}</span></td>
        <td>
          <Link to="" style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{faculty.emailId}</Link>
        </td>
        <td>
                    <span style={{ fontSize: '13.3333330154419px' }}>
                      <Link className=" btn btn-primary"
                            to={`/publicProfile/${faculty._id}`} target="_blank">
                        View Profile
                      </Link>
                    </span>
        </td>
      </tr>
    )
  }
}

FacultyData.defaultProps = {
  showActions: true
}

FacultyData.propTypes = {
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(FacultyData)
