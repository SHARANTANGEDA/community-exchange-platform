import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import CommentFeed from '../ShowComments/CommentFeed'
import AnswerCommentForm from './AnswerCommentForm'
import { downVoteAnswer, upVoteAnswer } from '../../../actions/homeQuestionsActions'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-react'

class AnswerDisplay extends Component {
  constructor () {
    super()
    this.onUpVote = this.onUpVote.bind(this)
    this.onDownVote = this.onDownVote.bind(this)
  }
  onUpVote(e) {
    this.props.upVoteAnswer(this.props.questionId,this.props.answer._id)
  }
  onDownVote(e) {
    this.props.downVoteAnswer(this.props.questionId,this.props.answer._id)
  }
  render () {
    const { answer, auth, questionId } = this.props
    console.log({ SingleAnswer: answer, auth: auth })
    let name = answer.firstName + ' ' + answer.lastName
    const rate = (answer.upVote.length) - (answer.downVote.length)

    return (
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
            <div className="row">
              <div className="col-md-2">
                <img className="img-fluid d-block" alt="https://static.pingendo.com/img-placeholder-1.svg"
                     src={answer.avatar}/>
              </div>
              <div className="col-md-10 flex-grow-1 d-flex">
                <div className="col-md-12 h-25 d-flex flex-grow-1" style={{ minHeight: '50%' }}>
                  {/*<p className="d-flex flex-grow-1 h-50 ">{answer.text}</p>*/}
                  <CKEditor
                    editor={ ClassicEditor}
                    data={answer.text}
                    disabled={true}
                    config={{
                      removePlugins: 'Heading,Link,bold,italic,bulletedList,numberedList,blockQuote',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="user-details d-flex justify-content-end">
                  <Link to={`/publicProfile/${answer.userId}`}
                        style={{ fontSize: '24', color: 'blue'}}
                        className="d-inline-flex flex-grow-1 align-items-end justify-content-end">
                    <img className="rounded-circle" style={{width: '25px',marginRight:'5px'}} alt=''
                         src={answer.avatar}/>{name}</Link>
                </div>
                <div className="user-action-time d-flex justify-content-end align-items-center"
                     style={{fontSize: '10px'}}> answered <span
                  title="2010-04-21 14:28:45Z" style={{fontSize: '10px'}}
                  className="relativeTime m-1 d-inline-flex flex-grow-0">at {new Date(answer.time).toLocaleString()}</span>
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
export default connect(mapStateToProps,{upVoteAnswer,downVoteAnswer})(AnswerDisplay)
