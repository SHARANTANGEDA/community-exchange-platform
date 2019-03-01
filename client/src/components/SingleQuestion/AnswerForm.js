import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addAnswer } from '../../actions/homeQuestionsActions'

class AnswerForm extends Component {
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
    const { questionId } = this.props;

    const newAnswer = {
      text: this.state.text,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar
    };

    this.props.addAnswer(questionId, newAnswer);
    if(this.state.text==='') {

    }else {
      this.props.history.push(`/viewQuestion/${questionId}`);
    }
    this.setState({ text: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <form>
        <div className="card-body">
          <h3 className="card-title"><b>Post your Answer Here</b></h3>
          <div className="row">
            <div className="col-md-12 form-group">
              <textarea
                className={
                  classnames(
                    " form-control form-control-lg wmd-input js-wz-element s-input bar0 mt-1 d-flex flex-grow-1 w-100"
                    ,{'is-invalid':errors.text})}
                name="text" cols="90" rows="10" tabIndex="101"
                placeholder="Write Your Answer Here" value={this.state.text} onChange={this.onChange}/>
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
