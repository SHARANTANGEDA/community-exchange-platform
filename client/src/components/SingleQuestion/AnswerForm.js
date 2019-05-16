import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { addAnswer } from '../../actions/homeQuestionsActions'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'

class AnswerForm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { questionId } = this.props;

    const newAnswer = {
      text: this.state.text,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      userId: user._id
    };

    this.props.addAnswer(questionId, newAnswer);
    if(this.state.text==='') {
    }else {
      console.log({"Adding answer here": newAnswer})
      window.location.reload();
      this.setState({ text: '' });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="card-body">
          <h3 className="card-title"><b>Post your Answer Here</b></h3>
          <div className="row">
            <div className="col-md-12 form-group">
              {/*<textarea*/}
              {/*  className={*/}
              {/*    classnames(*/}
              {/*      " form-control form-control-lg  mt-1 d-flex flex-grow-1 w-100"*/}
              {/*      ,{'is-invalid':errors.text})}*/}
              {/*  name="text" cols="90" rows="10" tabIndex="101"*/}
              {/*  placeholder="Write Your Answer Here" value={this.state.text} onChange={this.onChange}/>*/}
              <CKEditor
                editor={ ClassicEditor }
                data={this.state.text}
                onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  this.setState({text: data})
                  console.log( { event, editor, data } );
                } }
                config={{
                  fontColor: 'black'
                }}
              />
              {errors.text &&
              (<div className="invalid-feedback" >{errors.text}</div>)
              }
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex justify-content-end align-items-center">
              <button
              className="btn btn-primary w-70 my-1" type="submit">Post Answer</button></div>
          </div>
        </div>
      </form>
    );
  }
}

AnswerForm.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  questionId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addAnswer })(AnswerForm);
