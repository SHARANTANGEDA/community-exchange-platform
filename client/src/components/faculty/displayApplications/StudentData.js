import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { acceptTA, rejectTA } from '../../../actions/facultyActions'

class StudentData extends Component {
  constructor () {
    super()
    this.onAccept = this.onAccept.bind(this)
    this.onReject = this.onReject.bind(this)
  }
  onAccept(e) {
    this.props.acceptTA(this.props.student._id)
  }
  onReject(e) {
    this.props.rejectTA(this.props.student._id)
  }
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
                      <button className=" btn btn-primary"
                            onClick={this.onAccept} style={{background: 'green'}}>
                        Accept
                      </button>
                    </span>
        </td>
        <td>
                    <span style={{ fontSize: '13.3333330154419px', background: 'red',style: 'white'}}>
                      <button className=" btn btn-primary"
                              onClick={this.onReject} style={{background: 'red',style: 'white'}}>
                        Reject
                      </button>
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
  acceptTA: PropTypes.func.isRequired,
  rejectTA: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  faculty:state.faculty
})
export default connect(mapStateToProps,{acceptTA,rejectTA})(StudentData)
