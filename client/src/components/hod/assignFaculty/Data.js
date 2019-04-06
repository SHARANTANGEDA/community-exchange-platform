import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { assignFaculty } from '../../../actions/hodActions'

class Data extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      facultyId: '',
      errors: {}
    }
    this.onAssign = this.onAssign.bind(this)
  }
  onAssign(e) {
    this.setState({id:this.props.courseId,facultyId: this.props.faculty._id})
    const assignData = {
      id: this.state.id,
      facultyId: this.state.facultyId
    }
    this.props.assignFaculty(assignData,this.props.history)
  }
  componentDidMount() {
    if (this.props.match.params.id) {

    }
  }
  render () {
    const { faculty,courseId } = this.props
    console.log({ GetFaculty: faculty })
    const name = faculty.firstName + ' ' + faculty.lastName
    let showStatus;
    if(faculty.assigned) {
      showStatus= (
        <p  style={{border: '2px outset black',borderRadius: '5px',color: 'green',margin: '4px',padding: '2px',fontWeight: 'bold',fontSize: '14px'}}>
          assigned</p>
      )
    }else {
      showStatus= (
        <p  style={{border: '2px outset black',borderRadius: '5px',color: 'red',margin: '4px',padding: '2px',fontWeight: 'bold',fontSize: '14px'}}>
          Not Assigned</p>
      )
    }
    return (
      <tr className="odd">
        <td><span style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{name}</span></td>
        <td>
          <Link to="" style={{ fontFamily: 'Arial', fontSize: '12pt' }}>{faculty.emailId}</Link>
        </td>
        <td>
          {showStatus}
        </td>
        <td>
          <span style={{ fontSize: '13.3333330154419px' ,background: 'green',color: 'white'}}>
            <i className="fa fa-plus" aria-hidden="true"/>
            <button className=" btn btn-primary"
                    onClick={this.onAssign} target="_blank" style={{background: 'green',color: 'white'}}>Add</button>
          </span>
        </td>
      </tr>
    )
  }
}

Data.defaultProps = {
  showActions: true
}

Data.propTypes = {
  faculty: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  assignFaculty: PropTypes.func.isRequired,
  courseId: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps,{assignFaculty})(Data)
