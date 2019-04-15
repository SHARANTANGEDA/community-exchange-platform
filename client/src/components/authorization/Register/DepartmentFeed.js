import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class DepartmentFeed extends Component {
  render() {
    const  {departments}  = this.props;
    console.log({'departmentFeed':departments});
    return departments.map(department => (
      <option>{department.departmentName}</option>
    ));
  }
}

// {/*<option>Computer Science Engineering</option>*/}
// {/*<option>Electrical and Communications Engineering</option>*/}
// {/*<option>Electrical and Electronics Engineering</option>*/}
// {/*<option>Electronics and Instrumentation Engineering</option>*/}
// {/*<option>Mechanical Engineering</option>*/}
// {/*<option>Chemical Engineering</option>*/}
// {/*<option>Civil Engineering</option>*/}
// {/*<option>Manufacturing Engineering</option>*/}
// {/*<option>Msc.Biological Sciences</option>*/}
// {/*<option>Msc.Chemistry</option>*/}
// {/*<option>Msc.Economics</option>*/}
// {/*<option>Msc.Mathematics</option>*/}
// {/*<option>Msc.Physics</option>*/}
// {/*<option>B-Pharmacy</option>*/}
DepartmentFeed.propTypes = {
  departments: PropTypes.object.isRequired
};

export default DepartmentFeed;
