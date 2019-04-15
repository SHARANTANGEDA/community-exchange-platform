import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import TextFieldGroup from '../common/TextFieldGroup'
import { addCourse } from '../../actions/hodActions'

class AddCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courseCode: '',
      courseName: '',
      bio: '',
      errors: {}

    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

  }

  onSubmit (e) {
    e.preventDefault()
    const newCourse = {
      courseCode: this.state.courseCode,
      courseName: this.state.courseName,
      bio: this.state.bio
    }
    this.props.addCourse(newCourse,this.props.history)

  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onClickDiscard (e) {
    this.setState({ courseCode: '' })
    this.setState({ courseName: '' })
    this.setState({ bio: '' })
    this.props.history.push('/allCourses')
  }

  render () {
    const { errors } = this.state;
    console.log('In Add Course')
    return (
      <div className='addCourse'>
        <div id="content" className="snippet-hidden">
          <div className="ask-mainbar box-border">
            <form className="post-form" onSubmit={this.onSubmit}>
              <div id="question-form">
                <div className="question-context-title">
                  <h1 style={{
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 100, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    fontFamily: '\'Lobster\''
                  }}
                      className="rounded border bg-dark text-light p-1 pl-3 pr-5 text-center">Add Course</h1>
                </div>
                <div className="row grid--cell fl1 grid fd-column js-stacks-validation">
                  <label>
                    <h4>Course Code </h4>
                  </label>
                  <div className="fl1 ps-relative form-group">
                    <div className="col-md-6">
                      <TextFieldGroup placeholder="Ex: CS-F211, ME-F211, EEE-F211" error={errors.courseCode}
                                      type="text" onChange={this.onChange} value={this.state.courseCode}
                                      name="courseCode"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row grid--cell fl1 grid fd-column js-stacks-validation">
                <label>
                  <h4>Course Name </h4>
                </label>
                <div className="fl1 ps-relative form-group">
                  <div className="col-md-6">
                    <TextFieldGroup placeholder="Ex: Computer Programming" error={errors.courseName}
                                    type="text" onChange={this.onChange} value={this.state.courseName}
                                    name="courseName"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 form-group">
                  <label>
                    <h4>Bio </h4>
                  </label>
              <textarea
                className={
                  classnames(
                    " form-control form-control-lg  mt-1 d-flex flex-grow-1 w-100"
                    ,{'is-invalid':errors.bio})}
                name="bio" cols="90" rows="10" tabIndex="101"
                placeholder="Short description of the course" value={this.state.bio} onChange={this.onChange}/>
                  {errors.bio &&
                  (<div className="invalid-feedback" >{errors.bio}</div>)
                  }
                </div>
              </div>
              <div className="js-wz-element" id="question-only-section">
                <div className="form-submit">
                  <button className="btn btn-primary w-20 my-1" type="submit"
                          style={{ width: '30%', margin: '10px' }}>Add Course
                  </button>
                  <button className="btn btn-primary w-30 my-1" onClick={this.onClickDiscard.bind(this)}>cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

AddCourse.propTypes = {
  addCourse: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  courses: state.courses
})

export default connect(mapStateToProps, { addCourse })(AddCourse)
