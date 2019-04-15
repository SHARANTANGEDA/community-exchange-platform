import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import CourseData from './CourseData'

class CourseFeed extends Component {
  render() {
    const  {courses}  = this.props;
    console.log({'CourseFeed':courses});
    return courses.allCourses.map(course => (
      <CourseData course={course} key={course._id}/>
    ));
  }
}

CourseFeed.propTypes = {
  courses: PropTypes.object.isRequired
};

export default CourseFeed;
