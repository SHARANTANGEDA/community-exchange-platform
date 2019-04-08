import React, { Component } from 'react'
import Spinner from '../common/Spinner'
import { downVoteQuestion, getQuestionById, upVoteQuestion } from '../../actions/homeQuestionsActions'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import CommentFeed from './ShowComments/CommentFeed'
import CommentForm from './CommentForm'
import AnswerFeed from './ShowAnswers/AnswerFeed'
import AnswerForm from './AnswerForm'
import { connect } from 'react-redux'
import TagFeed from '../QuestionGet/Tags/TagFeed'

class ViewQuestion extends Component {
  constructor () {
    super()
    this.onUpVote = this.onUpVote.bind(this)
    this.onDownVote = this.onDownVote.bind(this)
  }
  componentDidMount () {
    this.props.getQuestionById(this.props.match.params.id)
  }
  onUpVote(e) {
    this.props.upVoteQuestion(this.props.home.question._id)
  }
  onDownVote(e) {
    this.props.downVoteQuestion(this.props.home.question._id)
  }
  render () {
    const { question, loading } = this.props.home
    console.log({ Question: question, Loading: loading })
    let questionContent

    if (question === null || loading) {
      questionContent = <Spinner/>
    } else {
      let name = question.firstName + ' ' + question.lastName
      const rate = (question.upVote.length) - (question.downVote.length)
      console.log({ INViewQues: name })
      let ansNoDisplay
      if (question.answer === null) {
        ansNoDisplay = '0 Answers'
      } else {
        if (question.answer.length === 1) {
          ansNoDisplay = '1 Answer'
        } else if (question.answer.length > 1) {
          ansNoDisplay = question.answer.length + ' Answers'
        } else {
          ansNoDisplay = '0 Answers'
        }
      }
      questionContent = (
        <div id="mainbar">
          <div className="card">
            <div className="card-body">
              <div className='row'>
                <div className="col-md-1">
                  <div className="row text-center">
            <span>
              <button onClick={this.onUpVote} style={{border: 'none',background: 'white',minWidth:'40px'}}>
                <i className="fas fa-chevron-up fa-2x" style={{ color: 'green' }}/>
              </button>
              <h1 className="display-5">{rate}</h1>
              <button onClick={this.onDownVote} style={{border: 'none',background: 'white',minWidth:'40px'}}>
                <i className="fas fa-chevron-down fa-2x" style={{ color: 'red' }}/>
              </button>
            </span>
                  </div>
                  <div>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="row mb-3">
                    <div className="col-md-8">
                      <h4 className="grid--cell fl1 fs-headline1 mt-2 d-inline-flex flex-grow-1">
                        {question.title}</h4>
                    </div>
                    <div className="col-md-4 d-flex justify-content-center align-items-center"><Link
                      className="btn btn-primary w-70 my-1" to="/askQuestion">Ask Question</Link></div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <img className="img-fluid d-block"
                           alt='http://pinegrow.com/placeholders/img19.jpg'
                           src={question.avatar}/></div>
                    <div className="col-md-10 flex-grow-1 d-flex">
                      <div className="col-md-12 h-25 d-flex flex-grow-1" style={{ minHeight: '50%' }}>
                        <p className="d-flex flex-grow-1 h-50 rounded">
                          {question.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 my-2">
                      <TagFeed tags={question.tags}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="user-action-time d-flex justify-content-end align-items-center"> asked <span
                        title=""
                        className="relativeTime m-1 d-inline-flex flex-grow-0">{new Date(question.time).toLocaleString()}</span>
                      </div>
                      <div className="user-details d-flex justify-content-end">
                        <Link to={`/publicProfile/${question.userId}`}
                              style={{ textShadow: '0px 0px 1px #0000ff', fontSize: '24' }}
                              className="d-inline-flex flex-grow-1 align-items-end justify-content-end">{name}</Link>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-grow-1 col-md-12">
                        {question.comments ? (<CommentFeed comments={question.comments}/>) : null}
                        <CommentForm questionId={question._id}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 my-2">
            <div id="answers-header">
              <div className="subheader answers-subheader">
                <h2>{ansNoDisplay} <span style={{ display: 'none' }} itemProp="answerCount">1</span>
                </h2>
              </div>
            </div>
          </div>
          <div className="card">
            {question.answer !== null ? (<AnswerFeed answers={question.answer} questionId={question._id}/>) : null}
            <div className="card">
              {<AnswerForm questionId={question._id}/>}
              {console.log({ Answer: question.answer })}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='/viewQuestion/:id'>
        <div className=" snippet-hidden d-flex justify-content-start w-100">
          <div className="inner-content w-100" style={{ margin: '15px' }}>
            {questionContent}
          </div>
        </div>
      </div>

    )
  }
}

ViewQuestion.propTypes = {
  getQuestionById: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired,
  upVoteQuestion:PropTypes.func.isRequired,
  downVoteQuestion:PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  home: state.home
})

export default connect(mapStateToProps, { getQuestionById,upVoteQuestion,downVoteQuestion })(ViewQuestion)
