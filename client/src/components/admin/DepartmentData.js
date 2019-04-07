import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class DepartmentData extends Component {
  render () {
    const { department } = this.props

    return (
      <tr className="odd">
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{department.departmentName}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{department.hodEmail}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{new Date(department.time).toLocaleString()}</span></td>
      </tr>
    )
  }
}

DepartmentData.defaultProps = {
  showActions: true
}

DepartmentData.propTypes = {
  department: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(DepartmentData)
