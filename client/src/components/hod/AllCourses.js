import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import FacultyFeed from './FacultyFeed'
import { getAllCourses } from '../../actions/hodActions'
import CourseFeed from './Courses/CourseFeed'

class AllCourses extends Component {

  componentDidMount () {
    this.props.getAllCourses(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { courses, loading,error} = this.props.courses
    let allCoursesContent
    if ((courses === null) || loading ) {
      allCoursesContent = <Spinner/>
    } else {
      if(error) {
        console.log({error,courses})
        allCoursesContent = (
          <div className="col-md-12">
            <div className="desc">
              <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                  className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">Department of {courses.department.departmentName}</h1>
              <h3 className='text-center'>{courses.NoCourse}</h3>
            </div>
          </div>
        )
      }else {
        allCoursesContent = (
          <div className="col-md-12">
            <div className="desc">
              <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                  className="rounded border bg-dark text-light p-1 pl-3 pr-5 text-center">Department of {courses.department.departmentName}</h1>

              <table  className="tableGrid rounded border"
                      style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',width : '100%'}} border="0">
                <tbody>
                <tr>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Course Name</strong>
                  </td>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Course ID</strong>
                  </td>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Faculty Status</strong>
                  </td>
                </tr>
                <CourseFeed courses = {courses}/>
                </tbody>
              </table>
            </div>
          </div>
        )
      }

    }

    return (
      <div className="container allCourses">
        <div className="row">
          {allCoursesContent}
        </div>
      </div>
    )
  }
}

AllCourses.propTypes = {
  getAllCourses: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  courses: state.courses,
})

export default connect(mapStateToProps, { getAllCourses })(AllCourses)
