import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import CommentDisplay from './CommentDisplay'

class CommentFeed extends Component {
  render() {
    const  {comments}  = this.props;
    console.log({'Comment':comments});
    return comments.map(comment => (
      <CommentDisplay comment={comment} key={comment._id}/>
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired
};

export default CommentFeed;