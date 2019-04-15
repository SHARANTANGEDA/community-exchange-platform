import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import ShowStudents from './ShowStudents'
import { Collapse } from 'react-collapse'

class TAData extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false,
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle(e) {
    this.setState({isOpen: !this.state.isOpen})
  }
  render () {
    const { course } = this.props
    console.log({ getCourse: course })
    // let showCourse = (
    //   <div>
    //     <Link to="#questionSub1" data-toggle="collapse" aria-expanded="false"
    //           className="dropdown-toggle d-flex justify-content-start align-items-start flex-grow-1 pl-1 w-100 my-3"
    //           style={{fontSize: '24px'}}>{course.courseCode}</Link>
    //     <ul className="collapse list-unstyled" id="questionSub1" >
    //       <ShowStudents students={course.students}/>
    //     </ul>
    //   </div>
    //
    // )

    return (
      <div>
           <button onClick={this.toggle}
                   className="rounded border bg-dark text-light d-flex justify-content-between align-items-center flex-grow-1 pl-1 w-100 my-3"
                   style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontSize: '25px'}}>
          {course.courseCode}<i className="fas fa-angle-down"/></button>

        <Collapse isOpened={this.state.isOpen}>
        <table  className="tableGrid rounded border"
                style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',width : '100%'}} border="0">
          <tbody>
          <tr>
            <td>
              <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Applicant Name</strong>
            </td>
            <td>
              <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Applicant EmailId</strong>
            </td>
            <td>
              <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Accept</strong>
            </td>
            <td>
              <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Reject</strong>
            </td>
          </tr>
          <ShowStudents students={course.students}/>
          </tbody>
        </table>
        </Collapse>

      </div>
    )
  }
}

TAData.defaultProps = {
  showActions: true
}

TAData.propTypes = {
  auth: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(TAData)
