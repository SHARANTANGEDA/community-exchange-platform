
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import CommentFeed from '../ShowComments/CommentFeed'
import AnswerCommentForm from './AnswerCommentForm'

class AnswerDisplay extends Component {
  render () {
    const {answer,auth} = this.props;
    console.log({SingleAnswer: answer,auth: auth})
    let name=answer.firstName + ' '+answer.lastName;
    return (
      <div className="card-body">
        <div className="row">
          <div className="col-md-2">
            <img className="img-fluid d-block" alt="https://static.pingendo.com/img-placeholder-1.svg"
                                         src={answer.avatar}/>
          </div>
          <div className="col-md-10 flex-grow-1 d-flex">
            <div className="col-md-12 h-25 d-flex flex-grow-1" style={{minHeight: "50%"}}>
              <p className="d-flex flex-grow-1 h-50 border border-secondary rounded" >{answer.text}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="user-action-time d-flex justify-content-end align-items-center"> answered <span
              title="2010-04-21 14:28:45Z"
              className="relativeTime m-1 d-inline-flex flex-grow-0">{answer.time}</span>
            </div>
            <div className="user-details d-flex justify-content-end">
              <Link to={`/publicProfile/${answer.user._id}`}
                    style={{'text-shadow': "0px 0px 1px #0000ff",fontSize:"24"}}
                 className="d-inline-flex flex-grow-1 align-items-end justify-content-end">{name}</Link>
            </div>
          </div>
        </div>
        <div className="d-flex flex-grow-1 col-md-12">
          <div className="comment-text js-comment-text-and-form w-75">
            <div className="comment-body js-comment-edit-hide">
             <CommentFeed comments={answer.comments}/>
              <AnswerCommentForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AnswerDisplay.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AnswerDisplay);
