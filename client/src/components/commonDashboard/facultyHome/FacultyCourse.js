import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import FacultyHomeQuestionsFeed from './FacultyHomeQuestionsFeed'

class FacultyCourse extends Component {
  render () {
    const { course,questions } = this.props
    console.log({ getCourse: course })
    return (
      <div>
        <Link to="#questionSub1" data-toggle="collapse" aria-expanded="false"
              className="dropdown-toggle d-flex justify-content-start align-items-start flex-grow-1 pl-1 w-100 my-3"
              style={{fontSize: '24pt'}}>{course.courseCode}</Link>

        <ul className="collapse list-unstyled" id="questionSub1" >
          <FacultyHomeQuestionsFeed questions={questions}/>
        </ul>
      </div>

    )
  }
}

// {/*<div>*/}
// {/*  <h3>{course.courseCode}-{course.courseName}</h3>*/}
// {/*  <div id="content" className="snippet-hidden">*/}
// {/*    <QuestionsFeed questions={questions}/>*/}
// {/*  </div>*/}
// {/*</div>*/}

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
