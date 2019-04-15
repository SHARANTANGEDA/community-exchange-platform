import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { getCourse } from '../../actions/hodActions'
import { Link } from 'react-router-dom'
import UserRow from '../Users/UserRow'

class ViewCourse extends Component {

  componentDidMount () {
    this.props.getCourse(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { courses, loading} = this.props.courses
    let courseContent
    if ((courses === null) || loading ) {
      courseContent = <Spinner/>
    } else {

        courseContent = (
          <div className="col-md-12">
            <div className="desc">
              <div className="row">
                <div className="col-md-4">
                  <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    ,fontFamily: "'Lobster'"}}
                      className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">
                    {courses.course.courseCode}</h1>
                </div>
                <div className="col-md-8 align-items-center justify-content-center">
                  <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    ,fontFamily: "'Lobster'"}}
                      className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">
                    {courses.course.courseName}</h1>
                </div>
              </div>

              <p className="ml-4">
                <span style={{fontFamily: 'Arial',fontSize: '12pt'}}>{courses.course.bio} </span></p>
              <div className="row">
                <div className="col-md-8">
                  <h2 className="ml-2">Faculty Assigned</h2>
                </div>
                <div className="col-md-4 align-items-center justify-content-center">
                  <Link  to={`/assignFaculty/${courses.course.courseCode}`}
                         className="btn btn-primary btn-lg w-50 ml-5 d-inline-flex flex-grow-1 text-center justify-content-center">
                    Add Faculty</Link>
                </div>
              </div>
              <UserRow users={courses.faculty}/>
            </div>
          </div>
        )
      }
    return (
      <div className="container viewCourse">
        <div className="row">
          {courseContent}
        </div>
      </div>
    )
  }
}

ViewCourse.propTypes = {
  getCourse: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  courses: state.courses,
})

export default connect(mapStateToProps, { getCourse })(ViewCourse)
