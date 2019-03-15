import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {PropTypes} from 'prop-types';
import { connect } from 'react-redux';
import TagFeed from './Tags/TagFeed'

class QuestionItem extends Component {
  render () {
    const {question} = this.props;
    console.log({GetQuestion:question})
    const name=question.firstName+' '+question.lastName;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-12">
            <Link className="lead" style={{color: '#0000EE',fontSize: '18'}} to={`/viewQuestion/${question._id}`} >
              {question.title}
            </Link>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-12 mt-2">
                <TagFeed tags={question.tags}/>
              </div>
            </div>
            <div className="user-action-time d-flex justify-content-end align-items-center"> asked at
              <span title="2010-04-21 14:28:45Z" className="relativetime m-1" >{new Date(question.time).toLocaleString()}</span>
            </div>
            <div className="user-details d-flex justify-content-end">
              <Link to={`/publicProfile/${question.userId}`} style={{	textShadow: "0px 0px 1px #0000FF",fontSize: "24"}}>{name}</Link>
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
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(QuestionItem);
