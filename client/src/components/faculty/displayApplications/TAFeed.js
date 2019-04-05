import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import TAData from './TAData'

class TAFeed extends Component {
  render() {
    const  {applications}  = this.props;
    console.log({'TAFeed':applications});
    return applications.display.map(course => (
      <TAData course={course} key={course._id}/>
    ));
  }
}

TAFeed.propTypes = {
  applications: PropTypes.object.isRequired
};

export default TAFeed;
