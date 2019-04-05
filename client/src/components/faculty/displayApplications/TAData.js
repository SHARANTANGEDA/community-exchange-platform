import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import ShowStudents from './ShowStudents'

class TAData extends Component {
  render () {
    const { course } = this.props
    console.log({ getCourse: course })
    let showCourse = (
      <div>
        <Link to="#questionSub1" data-toggle="collapse" aria-expanded="false"
              className="dropdown-toggle d-flex justify-content-start align-items-start flex-grow-1 pl-1 w-100 my-3"
              style="font-size: 24pt;">{course.courseCode}</Link>
        <ul className="collapse list-unstyled" id="questionSub1" style="">
          <ShowStudents students={course.students}/>
        </ul>
      </div>
    )

    return (
      <div>
        { showCourse }
      </div>
    )
  }
}

TAData.defaultProps = {
  showActions: true
}

TAData.propTypes = {
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(TAData)
