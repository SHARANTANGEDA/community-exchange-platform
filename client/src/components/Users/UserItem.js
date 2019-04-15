import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import './allUsers.css'

class UserItem extends Component {
  render () {
    const {user} = this.props;
    const name = user.firstName+' '+user.lastName;
    console.log({reputation:user})
    // return (
    //   <div className="col-md-4" style={{margin: '10px'}}>
    //     <img className="rounded-circle" src={user.avatar} alt='http://pinegrow.com/placeholders/img19.jpg' style={{height: "20%", width: "35%"}}/>
    //     <h3><Link to={`/publicProfile/${user._id}`}>{name}</Link></h3>
    //     <p>{user.emailId}</p>
    //     <p>{user.departmentName}</p>
    //   </div>
    // )
    return (
      //onTouchStart="this.classList.toggle('hover');
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="image-flip" >
          <div className="mainflip">
            <div className="frontside">
              <div className="card" >
                <div className="card-body text-center">
                  <p><img className=" img-fluid" src={user.avatar} alt='http://pinegrow.com/placeholders/img19.jpg'/></p>
                  <div className='row d-flex justify-content-between'>
                    <h4 className="card-title" style={{fontSize: '18px'}}>{name}</h4>
                    <p  className='btn btn-primary btn-sm' style={{color: 'white',fontFamily: "'Germania One'"}}>{user.role}</p>
                  </div>
                  <p className="card-text" style={{fontSize: '14px'}}>{user.departmentName}</p>

                  <p className="card-text" style={{fontSize: '14px'}}>{user.emailId}</p>
                  <div className="row  justify-content-between " style={{marginTop:'2px'}} >
                    <h1  className='display-5' style={{border: 'none',color: 'gold'}}>
                      <i className="fa fa-certificate fa-1x"/>{user.reputation}</h1>
                    <button className="btn btn-primary" style={{height: '50%'}}>
                      <Link to={`/publicProfile/${user._id}`} style={{color: 'white'}}>View Profile</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="backside">*/}
            {/*  <div className="card">*/}
            {/*    <div className="card-body text-center mt-4">*/}
            {/*      <h4 className="card-title">Sunlimetech</h4>*/}
            {/*      <p className="card-text">This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.This is basic card with image on top, title, description and button.</p>*/}
            {/*      <ul className="list-inline">*/}
            {/*        <li className="list-inline-item">*/}
            {/*          <Link className="social-icon text-xs-center" target="_blank" to="">*/}
            {/*            <i className="fa fa-facebook"/>*/}
            {/*          </Link>*/}
            {/*        </li>*/}
            {/*        <li className="list-inline-item">*/}
            {/*          <Link className="social-icon text-xs-center" target="_blank" to="">*/}
            {/*            <i className="fa fa-twitter"/>*/}
            {/*          </Link>*/}
            {/*        </li>*/}
            {/*        <li className="list-inline-item">*/}
            {/*          <Link className="social-icon text-xs-center" target="_blank" to="">*/}
            {/*            <i className="fa fa-skype"/>*/}
            {/*          </Link>*/}
            {/*        </li>*/}
            {/*        <li className="list-inline-item">*/}
            {/*          <Link className="social-icon text-xs-center" target="_blank" to="">*/}
            {/*            <i className="fa fa-google"/>*/}
            {/*          </Link>*/}
            {/*        </li>*/}
            {/*      </ul>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    )
  }
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(UserItem);