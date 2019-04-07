import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { askQuestion, getCourseCodes } from '../../actions/homeQuestionsActions'
import classnames from 'classnames';
import GetCourses from '../commonDashboard/GetCourses'

class AskQuestions extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      description: '',
      tags: '',
      course: 'Choose Course',
      errors: {}

    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCourseCodes(this.props.match.params.id);
    console.log("Called DidMount in All CourseCodes");

  }
  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

  }


  onSubmit (e) {
    e.preventDefault();
    const { user } = this.props.auth
    const newQuestion = {
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      course:this.state.course
    }
    this.props.askQuestion(newQuestion);
    if(this.state.title==='' || this.state.description==='' || this.state.tags==='') {

    }else {
      this.props.history.push('/dashboard');
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onClickDiscard(e) {
    this.setState({ title: '' })
    this.setState({ description: '' })
    this.setState({ tags: '' })
    this.setState({ course: 'Choose Course' })

  }


  render () {
    const { errors } = this.state;
    const { courses, loading } = this.props.courses;
    const {home} = this.props;
    let content;

    if (courses === null || loading) {
      content = null;
    } else {
      let codes=courses.allCourses;
      console.log({codes:codes})
      content = (
        <GetCourses codes={codes}/>
      )
    }
    console.log("In Ask Question")
    return (
      <div className='askQuestion'>
        <div id="content" className="snippet-hidden">
        <div className="ask-mainbar box-border">
          <form  className="post-form" onSubmit={this.onSubmit}>
            <div id="question-form">
              <div className="question-context-title">
                <h2>Ask a question</h2>
              </div>
              <div className="js-wz-element" id="post-title" style={{position: 'relative'}} data-wz-state="2,4,256">
                <div className="form-item ask-title">
                  <div className="js-wz-element" data-wz-state="2,256">
                    <div className="grid gs8 gsx">
                      <div className="grid--cell fl1 grid fd-column js-stacks-validation">
                        <label>
                          <h4>Title</h4>
                        </label>
                        <div className="fl1 ps-relative form-group">
                          <input name="title" type="text" maxLength="300" tabIndex="100"
                                 placeholder="Be specific."
                                 className={classnames("s-input js-ask-title h100 mt0 ask-title-field w-75 form-control",
                                   {'is-invalid':errors.title})}
                                  onChange={this.onChange} value={this.state.title}/>
                          {errors.title &&
                          (<div className="invalid-feedback" >{errors.title}</div>)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="post-editor" className="post-editor js-post-editor js-wz-element">
              <div className="ps-relative w-75">
                <label className="s-label mb4 d-block w-100" htmlFor="wmd-input">
                  <h4>Body</h4>
                </label>
                <div className="wmd-container mb8 w-100 form-group">
                    <textarea className={classnames("wmd-input js-wz-element s-input bar0 w-100 form-control"
                      ,{'is-invalid':errors.description})} name="description"
                              cols="90" rows="15" tabIndex="101" onChange={this.onChange}
                              value={this.state.description} />
                    {errors.description &&
                    (<div className="invalid-feedback" >{errors.description}</div>)
                    }
                </div>
              </div>
            </div>
            <div className="wrap-input100 input100-select form-group">
              <select className={classnames("selection-2 form-control form-control-lg",{'is-invalid': errors.course})}
                      name="course" value={this.state.course} onChange={this.onChange}>

                <option>Choose Course</option>
                {content}
              </select>
              {errors.course && (
                <div className="invalid-feedback">{errors.course}</div>
              )}
            </div>
            <span className="focus-input100"/>
            <div className="ps-relative">
                <label htmlFor="tagNames" className="s-label mb4 d-block">
                  <h4>Tags</h4>
                </label>
                <div className="ps-relative form-group">
                  <input className={classnames("s-input box-border form-control",{'is-invalid':errors.tags})} name="tags" type="text"
                         tabIndex="103" placeholder="Type Tags with separated commas" onChange={this.onChange}
                         value={this.state.tags}/>
                  {errors.tags &&
                  (<div className="invalid-feedback" >{errors.tags}</div>)
                  }
                </div>
            </div>
            <div className="js-wz-element" id="question-only-section">
              <div className="form-submit cbt grid gsx gs4 p0 mt32">
                <button className="btn btn-primary w-20 my-1" type="submit" tabIndex="120"
                        style={{width: "30%",margin: "10px"}}> Post Your Question
                </button>
                <button className="btn btn-primary w-30 my-1" onClick={this.onClickDiscard.bind(this)}>Discard</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    )
  }
}

AskQuestions.propTypes = {
  askQuestion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCourseCodes: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  courses: state.courses,
  home: state.home,

})

export default connect(mapStateToProps, { getCourseCodes,askQuestion })(AskQuestions)
