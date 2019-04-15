import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import AnswerDisplay from './AnswerDisplay'

class AnswerFeed extends Component {
  render() {
    const  {answers,questionId}  = this.props;
    console.log({'Answers':answers});
    return answers.map(answer => (
      <AnswerDisplay answer={answer} key={answer._id} questionId={questionId}/>
    ));
  }
}

AnswerFeed.propTypes = {
  answers: PropTypes.array.isRequired,
  questionId:PropTypes.string.isRequired
};

export default AnswerFeed;