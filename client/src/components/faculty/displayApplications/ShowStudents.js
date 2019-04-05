import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import StudentData from './StudentData'

class ShowStudents extends Component {
  render() {
    const  {students}  = this.props;
    console.log({'StudentFeed':students});
    return students.map(student => (
      <li>
        <StudentData student={student}/>
      </li>
    ));
  }
}

ShowStudents.propTypes = {
  students: PropTypes.array.isRequired
};

export default ShowStudents;
