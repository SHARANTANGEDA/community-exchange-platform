import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import { getDepartments } from '../../actions/authActions'
import DepartmentFeed from './DepartmentFeed'

class AllDepartments extends Component {

  componentDidMount () {
    this.props.getDepartments(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { home, loading} = this.props.hod
    let allCoursesContent
    if ((home === null) || loading ) {
      allCoursesContent = <Spinner/>
    } else {
      console.log({home: home})
      if(home.length===0) {
        allCoursesContent = (
          <div className="col-md-12">
            <div className="desc">
              <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                  className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">All Departments</h1>
              <h3 className='text-center'>No Department Added yet</h3>
              <div className="pull-right justify-content-end" style={{minWidth: '250px'}}>
                <Link className="btn btn-primary btn-lg w-100" style={{minWidth: '250px'}} to="/addDepartment">
                  Add Department</Link>
              </div>
            </div>
          </div>
        )
      }else {
        allCoursesContent = (
          <div className="col-md-12">
            <div className="desc">

              <div className='row text-center'>
                <div className='col-md-9'>
                  <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                      className="rounded border bg-dark text-light p-1 pl-3 pr-5 text-center">All Departments</h1>
                </div>
                <div className='col-md-1 align-center'>
                  <Link className="btn btn-primary btn-lg pull-right" style={{minWidth: '250px'}} to="/addDepartment">
                    Add Department</Link>
                </div>
              </div>
              <table  className="tableGrid rounded border"
                      style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',width : '100%'}}>
                <tbody>
                <tr>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>Department Name</strong>
                  </td>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>HOD Email</strong>
                  </td>
                  <td>
                    <strong style={{fontFamily: 'Arial', fontSize: '14pt'}}>created On</strong>
                  </td>
                </tr>
                <DepartmentFeed departments={home}/>
                </tbody>
              </table>
            </div>
          </div>
        )
      }

    }

    return (
      <div className="container allDepartments">
        <div className="row">
          {allCoursesContent}
        </div>
      </div>
    )
  }
}

AllDepartments.propTypes = {
  getDepartments: PropTypes.func.isRequired,
  hod: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  hod: state.hod,
  auth: state.auth
})

export default connect(mapStateToProps, { getDepartments })(AllDepartments)
