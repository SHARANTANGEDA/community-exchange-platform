import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import CommentFeed from '../ShowComments/CommentFeed'
import AnswerCommentForm from './AnswerCommentForm'
import { downVoteQuestion, upVoteQuestion } from '../../../actions/homeQuestionsActions'

class AnswerDisplay extends Component {
  constructor () {
    super()
    this.onUpVote = this.onUpVote.bind(this)
    this.onDownVote = this.onDownVote.bind(this)
  }
  onUpVote(e) {
    this.props.upVoteQuestion(this.props.question._id)
  }
  onDownVote(e) {
    this.props.downVoteQuestion(this.props.question._id)
  }
  render () {
    const { answer, auth, questionId } = this.props
    console.log({ SingleAnswer: answer, auth: auth })
    let name = answer.firstName + ' ' + answer.lastName
    return (
      <div className="card-body">
        <div className='row'>
          <div className="col-md-1">
            <div className="row text-center">
            <span>
              <button onClick={this.onUpVote}>
                <i className="fas fa-chevron-up fa-2x" style={{ color: 'green' }}/>
              </button>
              <h1 className="display-5">{}</h1>
              <button onClick={this.onDownVote}>
                <i className="fas fa-chevron-down fa-2x" style={{ color: 'red' }}/>
              </button>
            </span>
            </div>
            <div>
            </div>
          </div>
          <div className="col-md-11">
            <div className="row">
              <div className="col-md-2">
                <img className="img-fluid d-block" alt="https://static.pingendo.com/img-placeholder-1.svg"
                     src={answer.avatar}/>
              </div>
              <div className="col-md-10 flex-grow-1 d-flex">
                <div className="col-md-12 h-25 d-flex flex-grow-1" style={{ minHeight: '50%' }}>
                  <p className="d-flex flex-grow-1 h-50 ">{answer.text}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="user-action-time d-flex justify-content-end align-items-center"> answered <span
                  title="2010-04-21 14:28:45Z"
                  className="relativeTime m-1 d-inline-flex flex-grow-0">{new Date(answer.time).toLocaleString()}</span>
                </div>
                <div className="user-details d-flex justify-content-end">
                  <Link to={`/publicProfile/${answer.userId}`}
                        style={{ textShadow: '0px 0px 1px #0000ff', fontSize: '24' }}
                        className="d-inline-flex flex-grow-1 align-items-end justify-content-end">{name}</Link>
                </div>
              </div>
            </div>
            <div className="d-flex flex-grow-1 col-md-12">
              <div className="comment-text js-comment-text-and-form w-75">
                <div className="comment-body js-comment-edit-hide">
                  <CommentFeed comments={answer.comments}/>
                  <AnswerCommentForm answerId={answer._id} questionId={questionId}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AnswerDisplay.propTypes = {
  auth: PropTypes.object.isRequired,
  questionId: PropTypes.string.isRequired,
  upVoteAnswer:PropTypes.func.isRequired,
  downVoteAnswer:PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps,{})(AnswerDisplay)
