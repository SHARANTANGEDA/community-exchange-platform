import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'
import { getTAApplications } from '../../actions/facultyActions'
import TAFeed from './displayApplications/TAFeed'

class TAApplications extends Component {

  componentDidMount () {
    this.props.getTAApplications(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { taApplications, loading} = this.props.faculty
    let allCoursesContent
    if ((taApplications === null) || loading ) {
      allCoursesContent = <Spinner/>
    } else {
      if(taApplications.faculty) {
        allCoursesContent = (
          <div className="col-md-12">
            <div className="desc">
              <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                  className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">Teacher Assistant Applications</h1>
              <h3 className='text-center'>No applications received yet</h3>
            </div>
          </div>)
      } else{
        console.log({'application': taApplications.applications})
        if(taApplications.applications.length===0) {
          allCoursesContent = (
            <div className="col-md-12">
              <div className="desc">
                <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                    className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">Teacher Assistant Applications</h1>
                <h3 className='text-center'>No applications received yet</h3>
                <div className="pull-right justify-content-end" style={{minWidth: '250px'}}>

                </div>
              </div>
            </div>
          )
        }else {
          allCoursesContent = (
            <div className="col-md-12">
              <div className="desc">
                <h1 style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',fontFamily: "'Lobster'"}}
                    className="rounded border bg-dark text-light text-center p-1 pl-3 pr-5">Teacher Assistant Applications</h1>
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
                  <TAFeed applications={taApplications.applications}/>
                  </tbody>
                </table>
              </div>
            </div>)
      }

      }

    }

    return (
      <div className="container taApplications">
        <div className="row">
          {allCoursesContent}
        </div>
      </div>
    )
  }
}

TAApplications.propTypes = {
  getTAApplications: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  faculty: state.faculty,
})

export default connect(mapStateToProps, { getTAApplications })(TAApplications)
