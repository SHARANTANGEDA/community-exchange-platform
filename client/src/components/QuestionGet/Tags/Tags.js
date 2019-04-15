import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class Tags extends Component {
  render () {
    const {tag,auth} = this.props;
    console.log({SingleTag: tag,auth: auth})
    return (
      <Link className="btn btn-info mx-3 d-inline-flex flex-grow-1" to=''>{tag}</Link>
    )
  }
}

Tags.propTypes = {
  tag: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Tags);