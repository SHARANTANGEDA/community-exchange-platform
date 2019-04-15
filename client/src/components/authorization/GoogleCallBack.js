import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { successRoute } from '../../actions/authActions'
import Spinner from '../common/Spinner'

class GoogleCallBack extends Component {
  componentDidMount () {
    this.props.successRoute(this.props.history)
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  componentWillReceiveProps (nextProps, nextContext) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  render () {

    return (
      <div className="googleCallBack">
        <Spinner/>
      </div>
    );
  }
}

GoogleCallBack.propTypes = {
  successRoute: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps,{successRoute})(GoogleCallBack);