import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class CourseData extends Component {
  render () {
    const { course } = this.props
    console.log({ getCourse: course })
    let showStatus;
    if(course.status) {
      showStatus = (
      <span style={{ fontSize: '13.3333330154419px' }}>
                      <Link className=" btn btn-primary"
                            to={`/viewCourse/${course.courseCode}`}>
                        View Course
                      </Link>
                    </span>
      )
    }else {
      showStatus= (
        <span style={{ fontSize: '13.3333330154419px' }}>
                      <Link className=" btn btn-primary"
                            to={`/assignFaculty/${course.courseCode}`}>
                        Assign Now
                      </Link>
                    </span>
      )
    }
    return (
      <tr className="odd">
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{course.courseName}</span></td>
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{course.courseCode}</span></td>
        <td>
          {showStatus}
        </td>
      </tr>
    )
  }
}

CourseData.defaultProps = {
  showActions: true
}

CourseData.propTypes = {
  course: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(CourseData)
