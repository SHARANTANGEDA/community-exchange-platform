import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { changePassword } from '../../actions/profileActions'

import classnames from 'classnames'
import { applyTA, getCourseCodes } from '../../actions/homeQuestionsActions'
import GetCourses from './GetCourses'

class ApplyTA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      courseCode: 'Choose Course',
      errors: {}
    };
    console.log({courseCode:this.state.courseCode})

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps,nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    console.log('IN NEXT PROPS')
    if (nextProps.home.courseCode) {
      const course = nextProps.home.courseCode;

      console.log({course:course})
      // Set component fields state
      this.setState({
        courseCode: course.courseCode
      });
    }
  }
  componentDidMount() {
    this.props.getCourseCodes(this.props.match.params.id);
    console.log("Called DidMount in All CourseCodes");

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const courseDetails = {
      courseCode: this.state.courseCode
    };
    console.log({codesIN: courseDetails})
    this.props.applyTA(courseDetails, this.props.history);
    console.log("Ta Applied")
    if(this.state.courseCode==='Choose Course') {

    }else {
      this.props.auth.user.applied=true;
      this.props.history.push('/dashboard');
    }

  }
  render() {
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
    return (
      <div className="container bootstrap snippet applyTA" style={{maxWidth: '100%'}}>
          <div >
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-10" style={{fontFamily: "Lobster",color: 'black',fontSize:'48px'}}><h1>TA Application</h1></div>
              </div>

              <div className="tab-content">
                <div className="tab-pane active">
                  <form onSubmit={this.onSubmit}>
                    <div className="wrap-input100 input100-select form-group">
                        <select className={classnames("selection-2 form-control form-control-lg",{'is-invalid': errors.courseCode})}
                                name="courseCode" value={this.state.courseCode} onChange={this.onChange}>

                          <option>Choose Course</option>
                          {content}
                        </select>
                        {errors.courseCode && (
                          <div className="invalid-feedback">{errors.courseCode}</div>
                        )}
                      </div>
                      <span className="focus-input100"/>
                    <div className="form-group">
                      <div className="col-xs-12">
                        <button className="btn btn-primary w-30 my-1" type="submit">Confirm Application</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

ApplyTA.propTypes = {
  applyTA: PropTypes.func.isRequired,
  getCourseCodes: PropTypes.func.isRequired,
  courses: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  courses: state.courses,
  home: state.home,
  auth: state.auth
});

export default connect(mapStateToProps,{getCourseCodes,applyTA} )(ApplyTA);
