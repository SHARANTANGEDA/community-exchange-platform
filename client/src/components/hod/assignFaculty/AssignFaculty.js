import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../../common/Spinner'
import { Link } from 'react-router-dom'
import { assignByCourseId } from '../../../actions/hodActions'
import Feed from './Feed'

class AssignFaculty extends Component {

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.assignByCourseId(this.props.match.params.id);
    }
  }
  render () {
    const { home, loading,faculty} = this.props.hod
    let dashboardContent
    if ((home === null) || loading ) {
      dashboardContent = <Spinner/>
    } else {
      console.log({home:home})
      if(!faculty) {
        dashboardContent = (
          <div className="col-md-12">
            <div className="desc">
              <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                  className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">Department of {home.department.departmentName}</h1>
              <h3 className='text-center'>{home.noFaculty}</h3>
            </div>
          </div>
        )
      }else {
        dashboardContent = (
          <div className="col-md-12">
            <div className="desc">
              <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                  className="rounded border bg-dark text-light p-1 pl-3 pr-5 text-center">Department of {home.department.departmentName}</h1>
              <div className="pull-right justify-content-end" style={{minWidth: '250px'}}>
                <Link className="btn btn-primary btn-lg pull-right" style={{minWidth: '250px'}}
                      to={`/viewCourse/${home.courseId}`}>
                  Done</Link>
              </div>
              <table  className="tableGrid rounded border"
                      style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',width : '100%'}} border="0">
                <tbody>
                <tr>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Faculty Name</strong>
                  </td>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Email Address </strong>
                  </td>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Status</strong>
                  </td>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Click to Add</strong>
                  </td>
                </tr>
                <Feed faculty = {home.faculty} courseId={home.courseId}/>
                </tbody>
              </table>
            </div>
          </div>
        )
      }

    }
    return (
      <div className="container assignFaculty">
        <div className="row">
          {dashboardContent}
        </div>
      </div>
    )
  }
}

AssignFaculty.propTypes = {
  assignByCourseId: PropTypes.func.isRequired,
  hod: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  hod: state.hod
})

export default connect(mapStateToProps, { assignByCourseId })(AssignFaculty)
