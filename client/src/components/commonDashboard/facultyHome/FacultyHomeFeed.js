import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import FacultyCourse from './FacultyCourse'

class FacultyHomeFeed extends Component {
  render() {
    const  {home}  = this.props;
    console.log({'FacultyHomeFeed':home});
    return home.data.map(fHome => (
      <FacultyCourse course={fHome.course} questions={fHome.questions} key={fHome.course._id}/>
    ));
  }
}

FacultyHomeFeed.propTypes = {
  home: PropTypes.object.isRequired
};

export default FacultyHomeFeed;
