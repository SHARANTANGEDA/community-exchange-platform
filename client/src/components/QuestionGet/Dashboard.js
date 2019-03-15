import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import QuestionsFeed from './QuestionsFeed'
import { Link } from 'react-router-dom'
import { getQuestionsHome } from '../../actions/homeQuestionsActions'
import Spinner from '../common/Spinner'

class Dashboard extends Component {

  componentDidMount () {
    this.props.getQuestionsHome(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { questions, loading} = this.props.home
    let dashboardContent
    if ((questions === null) || loading ) {
      dashboardContent = <Spinner/>
    } else {
        dashboardContent = (
          <div>
            {/*<h1>Dashboard Loads</h1>*/}
            <QuestionsFeed questions={questions}/>
          </div>
        )
      }

    return (
      <div className='dashboard' style={{width:'100%'}}>
        <div id="content" className="snippet-hidden " >
          <div className="inner-content" >
            <div id="mainbar" >
              <div className="grid">
                <div className="row">
                  <div className="col-md-8">
                    <h1 className="grid--cell fl1 fs-headline1"> Top Questions: </h1>
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
            {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getQuestionsHome: PropTypes.func.isRequired,
  home: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  home: state.home
})

export default connect(mapStateToProps, { getQuestionsHome })(Dashboard)
