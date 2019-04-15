import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { Collapse } from 'react-collapse'
import FacultyHomeQuestionsFeed from './FacultyHomeQuestionsFeed'

class FacultyCourse extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle(e) {
    this.setState({isOpen: !this.state.isOpen})
  }
  render () {
    const { course,questions } = this.props
    console.log({ getCourse: course })
    return (
      <div>
        <button onClick={this.toggle}
                className="rounded border bg-dark text-light d-flex justify-content-between align-items-center flex-grow-1 pl-1 w-100 my-3"
                style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontSize: '25px'}}>
          {course}<i className="fas fa-angle-down"/></button>
        <Collapse isOpened={this.state.isOpen} style={{listStyleType: 'none'}}>
          <FacultyHomeQuestionsFeed questions={questions}/>
        </Collapse>

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
  course: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(FacultyCourse)
