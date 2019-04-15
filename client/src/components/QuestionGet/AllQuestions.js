import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QuestionsFeed from './QuestionsFeed'
import { Link } from 'react-router-dom'
import { getAllQuestions } from '../../actions/homeQuestionsActions'
import Spinner from '../common/Spinner'

class AllQuestions extends Component {

  componentDidMount () {
    this.props.getAllQuestions(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { questions, loading} = this.props.home
    let allQuestionsContent
    if ((questions === null) || loading ) {
      allQuestionsContent = <Spinner/>
    } else {
      allQuestionsContent = (
        <div>
          <QuestionsFeed questions={questions}/>
        </div>
      )
    }

    return (
      <div className='allQuestions' style={{width:'100%'}}>
      <div id="content" className="snippet-hidden">
        <div className="inner-content">
          <div>
            <div className="grid">
              <div className="row">
                <div className="col-md-8">
                  <h1 className="grid--cell fl1 fs-headline1 d-flex flex-grow-1" > All Questions: </h1>
                </div>
                <div className="col-md-4"><Link className="btn btn-primary btn-lg w-75" to="/askQuestion">Ask
                  Question<br/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="comments">
          <div className="card card-body mb-3">
            {allQuestionsContent}
          </div>

          </div>
        </div>
      </div>
    )
  }
}

AllQuestions.propTypes = {
  getAllQuestions: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  home: state.home
})

export default connect(mapStateToProps, { getAllQuestions })(AllQuestions)
