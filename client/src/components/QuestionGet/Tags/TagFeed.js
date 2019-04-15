import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Tags from './Tags'

class TagFeed extends Component {
  render() {
    const  {tags}  = this.props;
    console.log({'Tags':tags});
    return tags.map(tag => (
      <Tags tag={tag} key={tag}/>
    ));
  }
}

TagFeed.propTypes = {
  tags: PropTypes.array.isRequired
};

export default TagFeed;