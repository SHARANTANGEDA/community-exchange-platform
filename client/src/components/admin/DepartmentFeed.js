import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import DepartmentData from './DepartmentData'

class DepartmentFeed extends Component {
  render() {
    const  {departments}  = this.props;
    console.log({'departmentFeed':departments});
    return departments.map(department => (
      <DepartmentData department={department}/>
    ));
  }
}

DepartmentFeed.propTypes = {
  departments: PropTypes.object.isRequired
};

export default DepartmentFeed;
