import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { applyTA, getCourseCodes } from '../../actions/homeQuestionsActions'
import Select from 'react-select';

class Sidebar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      courseCode: null,
      errors: {}
    }
    console.log({ courseCode: this.state.courseCode })

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

    console.log('IN NEXT PROPS')
    if (nextProps.home.courseCode) {
      const course = nextProps.home.courseCode

      console.log({ course: course })
      // Set component fields state
      this.setState({
        courseCode: course.courseCode
      })
    }
  }

  componentDidMount () {
    if (this.props.auth.user.role === 'student') {
      if (this.props.auth.user.applied === false) {
        this.props.getCourseCodes(this.props.match.params.id)
        console.log('Mounted application in Side Bar')
      }
    }

  }

  onChange (e) {
    console.log(e.value)
    this.setState({courseCode: e})
    console.log(this.state.courseCode)
  }

  onSubmit (e) {
    e.preventDefault()

    const courseDetails = {
      courseCode: this.state.courseCode.value
    }
    console.log({ codesIN: courseDetails })
    this.props.applyTA(courseDetails, this.props.history)
    console.log('Ta Applied')
    if (this.state.courseCode === 'Choose Course' || this.state.courseCode==='' || this.state.courseCode===null) {

    } else {
      this.props.auth.user.applied = true
      this.props.history.push('/dashboard')
    }
  }

  render () {

    const { isAuthenticated, user } = this.props.auth
    const { errors } = this.state
    const { courses, loading } = this.props.courses
    const {courseCode} = this.state
    let content=[]
    let showContent, applyTA = null
    if (isAuthenticated && user.role === 'student') {
      if (this.props.auth.user.applied === false) {
        console.log({ side: user })

        if (courses === null || loading) {
          applyTA = <p>courses null</p>
        } else {
          let codes = courses.allCourses
          console.log({ codes: codes })
          codes.map(course => (
            content.push({value: course,label: course})
          ));
        }
        applyTA = (
          <div style={{background: '#008dbb',borderRadius:'10px'}}>
            <h2 className="grid--cell fl1 fs-headline1 text-center"
                style={{fontFamily: 'Lobster', color: 'white' }}>Apply For TA</h2>
            <div className="tab-content">
              <div className="tab-pane active">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group text-center" style={{margin:'5px',borderRadius:'5px'}}>
                    <Select  options={content} className="isSearchable" placeholder="Select the course..."
                            name="courseCode" value={courseCode} onChange={this.onChange}>
                    </Select>
                    {errors.courseCode && (
                      <div className="invalid-feedback">{errors.courseCode}</div>
                    )}
                  </div>
                  <span className="focus-input100"/>
                  <div className="form-group">
                    <div className="col-xs-12 text-center">
                      <button className="btn btn-primary w-30 my-1" type="submit"
                              style={{background: 'white', color:'#008dbb',borderRadius:'10px'}}>
                        Send Application</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      } else {
        applyTA = null
      }
      showContent = (
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{ height: '100%' }}>
          <ul className="list-unstyled components">
            <li className="active">
            </li>
            <li>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <i className="fas fa-home"/>
                Home
              </Link>
              <Link to="/allQuestions" style={{ textDecoration: 'none' }}>
                <i className="fas fa-question"/>
                All Questions
              </Link>
              <Link to="/allProfiles" style={{ textDecoration: 'none' }}>
                <i className="fas fa-question"/>
                All Users
              </Link>
            </li>
            <li>
              <Link to="/contactUs" style={{ textDecoration: 'none' }}>
                <i className="fas fa-paper-plane"/>
                Contact Us
              </Link>
            </li>
          </ul>
          {applyTA}
        </nav>
      )

    } else if (isAuthenticated && user.role === 'faculty') {
      showContent = (
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{ height: '100%' }}>
          <ul className="list-unstyled components" style={{ height: '100%' }}>
            <li className="active">
            </li>
            <li>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <i className="fas fa-home"/>
                Home
              </Link>
              <Link to="/allQuestions" style={{ textDecoration: 'none' }}>
                <i className="fas fa-question"/>
                All Questions
              </Link>
              <Link to="/allProfiles" style={{ textDecoration: 'none' }}>
                <i className="fas fa-question"/>
                All Users
              </Link>
              <Link to="/taApplications" style={{ textDecoration: 'none' }}>
                <i className="fas fa-question"/>
                TA Applications
              </Link>
              {/*<Link to="" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle" style={{textDecoration: 'none',color: 'black'}}>*/}
              {/*  <i className="fas fa-copy"/>*/}
              {/*  Tags*/}
              {/*</Link>*/}
              {/*<ul className="collapse list-unstyled" id="pageSubmenu">*/}
              {/*  <li>*/}
              {/*    <Link to="" style={{textDecoration: 'none',color: 'black'}}>Course Tags</Link>*/}
              {/*  </li>*/}
              {/*  <li>*/}
              {/*    <Link to="" style={{textDecoration: 'none',color: 'black'}}>Subject Tags</Link>*/}
              {/*  </li>*/}
              {/*</ul>*/}
            </li>
            <li>
              <Link to="/contactUs" style={{ textDecoration: 'none' }}>
                <i className="fas fa-paper-plane"/>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )
    } else if (isAuthenticated && user.role === 'hod') {
      showContent = (
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{ height: '100%' }}>
          <ul className="list-unstyled components" style={{ height: '100%' }}>
            <li className="active">
            </li>
            <li>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <i className="fas fa-home"/>
                Home
              </Link>
            </li>
            <li>
              <Link to="/allProfiles" style={{ textDecoration: 'none' }}>
                <i className="fas fa-question"/>
                All Users
              </Link>
            </li>
            <li>
              <Link to="/unAssignedFaculty" style={{ textDecoration: 'none' }}>
                UnAssigned Faculty
              </Link>
            </li>
            <li>
              <Link to="/allCourses" style={{ textDecoration: 'none' }}>
                All Courses
              </Link>
            </li>
            <li>
              <Link to="/contactUs" style={{ textDecoration: 'none' }}>
                <i className="fas fa-paper-plane"/>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )
    } else if (isAuthenticated && user.role === 'admin') {
      showContent = (
        <nav id="sidebar" className='sidebar-nav-fixed affix' style={{ height: '100%' }}>
          <ul className="list-unstyled components" style={{ height: '100%' }}>
            <li className="active">
            </li>
            <li>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <i className="fas fa-home"/>
                Home
              </Link>
            </li>
            <li>
              <Link to="/allProfiles" style={{ textDecoration: 'none' }}>
                <i className="fas fa-question"/>
                All Users
              </Link>
            </li>
            <li>
              <Link to="/addDepartment" style={{ textDecoration: 'none' }}>
                Add Department
              </Link>
            </li>
            <li>
              <Link to="/allDepartments" style={{ textDecoration: 'none' }}>
                All Departments
              </Link>
            </li>
            <li>
              <Link to="/contactUs" style={{ textDecoration: 'none' }}>
                <i className="fas fa-paper-plane"/>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      )
    }
    return (
      <div style={{ minHeight: '100%' }}>
        {showContent}
      </div>
    )
  }
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired,
  getCourseCodes: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
  applyTA: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
  auth: state.auth,
  courses: state.courses,
  home: state.home,
})

export default connect(mapStateToProps, { getCourseCodes, applyTA })(Sidebar)
