import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class CommentDisplay extends Component {
  render () {
    const {comment,auth} = this.props;
    console.log({SingleComment: comment,auth: auth})
    let name=comment.firstName + ' '+comment.lastName;
    return (
      <div className="row d-flex justify-content-end border-bottom border-top">
        <span className="comment-copy d-inline-flex flex-grow-1">
         {comment.text}</span> –&nbsp;
        <Link to={`/publicProfile/${comment.userId}`} title="74 reputation"
           className="comment-user owner"><img className="rounded-circle" style={{width: '25px',marginRight:'5px'}} alt=''
                                               src={comment.avatar}/>{name}</Link>
        <span className="comment-date" dir="ltr">
          <span title="2019-02-25 12:56:03Z"
                className="relativeTime-clean">at {new Date(comment.time).toLocaleString()}</span></span>
      </div>

    )
  }
}

CommentDisplay.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(CommentDisplay);