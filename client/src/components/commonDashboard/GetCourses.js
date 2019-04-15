import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class GetCourses extends Component {
  render() {
    const  {codes}  = this.props;
    console.log({'courses':codes});
    return codes.map(course => (
      <option >{course}</option>
    ));
  }
}

GetCourses.propTypes = {
  codes: PropTypes.array.isRequired
};

export default GetCourses;
