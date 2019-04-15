import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { addAnswerComment } from '../../../actions/homeQuestionsActions'

class AnswerCommentForm extends Component {
  constructor(props) {
    super(props);
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
    const { questionId,answerId } = this.props;

    const newComment = {
      text: this.state.text,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      userId: user._id
    };

    this.props.addAnswerComment(questionId,answerId,newComment);
    if(this.state.text==='') {

    }else {
      window.location.reload();
    }
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-lg-12 form-group">
            <textarea
              className=
                {classnames("form-control form-control-lg wmd-input js-wz-element s-input bar0 d-flex flex-grow-1" +
                  " ml-2 mt-3 w-100",{'is-invalid':errors.text})}
              name="text"  rows="3" tabIndex="101"
              placeholder="Write Your Comment Here" value={this.state.text} onChange={this.onChange}/>
            {errors.text &&
            (<div className="invalid-feedback" >{errors.text}</div>)
            }
          </div>
          <div className="col-md-2 justify-content-center d-inline-flex align-items-center">
            <button className="btn btn-primary w-70 my-2 px-4" type="submit">Post</button></div>
        </div>
      </form>
    );
  }
}

AnswerCommentForm.propTypes = {
  addAnswerComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  questionId: PropTypes.string.isRequired,
  answerId:PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addAnswerComment })(AnswerCommentForm);
