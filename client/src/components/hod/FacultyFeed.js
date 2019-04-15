import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import FacultyData from './FacultyData'

class FacultyFeed extends Component {
  render() {
    const  {faculty}  = this.props;
    console.log({'FacultyFeed':faculty});
    return faculty.map(faculty => (
      <FacultyData faculty={faculty} key={faculty._id}/>
    ));
  }
}

FacultyFeed.propTypes = {
  faculty: PropTypes.array.isRequired
};

export default FacultyFeed;
