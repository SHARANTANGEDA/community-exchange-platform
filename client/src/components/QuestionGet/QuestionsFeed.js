import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import QuestionItem from './QuestionItem'

class QuestionsFeed extends Component {
  render() {
    const  {questions}  = this.props;
    console.log({'QuestionFeed':questions});
    return questions.map(question => (
      <QuestionItem question={question} key={question._id}/>
    ));
  }
}

QuestionsFeed.propTypes = {
  questions: PropTypes.array.isRequired
};

export default QuestionsFeed;
