import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class StudentData extends Component {
  render () {
    const { student } = this.props
    console.log({ GetStudent:student })
    const name = student.firstName + ' ' + student.lastName
    return (
      <tr className="odd">
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{name}</span></td>
        <td>
          <Link to="" style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{student.emailId}</Link>
        </td>
        <td>
                    <span style={{ fontSize: '13.3333330154419px', background: 'green',style: 'white'}}>
                      <Link className=" btn btn-primary"
                            to="" target="_blank" style={{background: 'red'}}>
                        Accept
                      </Link>
                    </span>
        </td>
        <td>
                    <span style={{ fontSize: '13.3333330154419px', background: 'red',style: 'white'}}>
                      <Link className=" btn btn-primary"
                            to="" target="_blank" style={{background: 'red',style: 'white'}}>
                        Accept
                      </Link>
                    </span>
        </td>
      </tr>
    )
  }
}

StudentData.defaultProps = {
  showActions: true
}

StudentData.propTypes = {
  student: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(StudentData)
