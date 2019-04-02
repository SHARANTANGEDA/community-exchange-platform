import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import QuestionsFeed from '../QuestionGet/QuestionsFeed'

class FacultyCourse extends Component {
  render () {
    const { course,questions } = this.props
    console.log({ getCourse: course })
    return (
      <div>
        <h3>{course.courseCode}-{course.courseName}</h3>
        <div id="content" className="snippet-hidden">
          <QuestionsFeed questions={questions}/>
        </div>
      </div>
    )
  }
}

FacultyCourse.defaultProps = {
  showActions: true
}

FacultyCourse.propTypes = {
  course: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(FacultyCourse)
