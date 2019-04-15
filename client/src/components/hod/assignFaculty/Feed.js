import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Data from './Data'

class Feed extends Component {
  render() {
    const  {faculty,courseId}  = this.props;
    console.log({'FacultyFeed':faculty,courseId});
    return faculty.map(faculty => (
      <Data faculty={faculty} courseId={courseId} key={faculty._id}/>
    ));
  }
}

Feed.propTypes = {
  faculty: PropTypes.array.isRequired,
  courseId: PropTypes.string.isRequired
};

export default Feed;
