import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import QuestionItem from '../../QuestionGet/QuestionItem'

class FacultyHomeQuestionsFeed extends Component {
  render() {
    const  {questions}  = this.props;
    console.log({'QuestionsFeed':questions});
    return questions.map(question => (
      <li><QuestionItem question={question} key={question._id}/></li>
    ));
  }
}

FacultyHomeQuestionsFeed.propTypes = {
  questions: PropTypes.array.isRequired
};

export default FacultyHomeQuestionsFeed;
