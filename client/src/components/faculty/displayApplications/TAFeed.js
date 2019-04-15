import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import TAData from './TAData'

class TAFeed extends Component {
  render() {
    const  {applications}  = this.props;
    console.log({'TAFeed':applications});
    return applications.map(course => (
      <TAData course={course} key={course.courseCode.trim()}/>
    ));
  }
}

TAFeed.propTypes = {
  applications: PropTypes.array.isRequired
};

export default TAFeed;
