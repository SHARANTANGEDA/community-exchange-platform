import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import TagFeed from './Tags/TagFeed'
import { downVoteQuestion, upVoteQuestion } from '../../actions/homeQuestionsActions'

class QuestionItem extends Component {
  constructor () {
    super()
    this.onUpVote = this.onUpVote.bind(this)
    this.onDownVote = this.onDownVote.bind(this)
  }

  onUpVote (e) {
    this.props.upVoteQuestion(this.props.question._id)
  }

  onDownVote (e) {
    this.props.downVoteQuestion(this.props.question._id)
  }

  render () {
    const { question } = this.props
    console.log({ GetQuestion: question })
    const name = question.firstName + ' ' + question.lastName

    const rate = (question.upVote.length) - (question.downVote.length)
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-1">
            <div className="row">
            <span>
              <button className='text-center' onClick={this.onUpVote}
                      style={{ border: 'none', background: 'white', minWidth: '40px' }}>
                <i className="fas fa-chevron-up fa-2x" style={{ color: 'green' }}/>
              </button>
            </span>
            </div>
            <div className="row">
              <span>
              <button style={{ border: 'none', background: 'white', minWidth: '40px' }}>
              <h1 className="display-5">{rate}</h1>
              </button>
              </span>
            </div>
            <div className="row">
              <span>
              <button onClick={this.onDownVote} style={{ border: 'none', background: 'white', minWidth: '40px' }}>
                <i className="fas fa-chevron-down fa-2x" style={{ color: 'red' }}/>
              </button>
            </span>
            </div>
          </div>
        <div className="col-md-11">
          <Link className="lead link-primary" style={{ color: '#2D2E28', fontSize: '18' }}
                to={`/viewQuestion/${question._id}`}>
            {question.title}
          </Link>
          <div className="row">
            <div className="col-md-12 mt-2">
              <TagFeed tags={question.tags}/>
            </div>
          </div>
          <div className="user-details d-flex justify-content-end">
            <Link to={`/publicProfile/${question.userId}`} className="card-link"
                  style={{ textShadow: '0px 0px 1px', fontSize: '24' }}>
              <img className="rounded-circle" style={{width: '25px',marginRight:'5px'}} alt=''
                   src={question.avatar}/>{name}</Link>
          </div>
          <div className='d-flex justify-content-between'>
            <p>{question.views.length} views</p>
            <div className="user-action-time d-flex justify-content-end align-items-center blockquote-footer"> asked at
              <span title="2010-04-21 14:28:45Z"
                    className="relativetime m-1 ">{new Date(question.time).toLocaleString()}</span>
            </div>
          </div>

        </div>
        </div>
      </div>
    )
  }
}

QuestionItem.defaultProps = {
  showActions: true
}

QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  downVoteQuestion: PropTypes.func.isRequired,
  upVoteQuestion: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { upVoteQuestion, downVoteQuestion })(QuestionItem)
