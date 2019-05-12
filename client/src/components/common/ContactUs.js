import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'

class ContactUs extends Component {

  render () {
    console.log("In contact us")
    return (
      <div className="container contactUs">
        <div className="row">
          <div className="col-md-12">
            <div className="container bg-dark">
              <div className="row">
                <div className="col-md-12 bg-light">
                  <h1 className="text-capitalize pt-1 text-center bg-light text-dark">Our team</h1>
                </div>
              </div>
              <div className="row bg-dark">
                <div className="col-6 col-lg-3 p-4 bg-dark">
                  <img className="img-fluid d-block mb-3  rounded-circle"
                       src={require("../../img/us/sharan.jpeg")} alt="" width="100" />
                    <h4 className="text-light"><b>Sai Sharan Tangeda</b></h4>
                    <p className="mb-3 text-white">f20170241@hyderabad.bits-pilani.ac.in</p>
                </div>
                <div className="col-6 col-lg-3 p-4 bg-dark">
                  <img className="img-fluid d-block mb-3 mx-auto rounded-circle"
                       src={require("../../img/us/adapa.jpg")} alt="" width="100" />
                    <h4 className="text-light"><b>Adapa Sai Vamsi</b></h4>
                    <p className="mb-3 text-white">f20170023@hyderabad.bits-pilani.ac.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// {/*<div className="row w-25 bg-dark">*/}
// {/*  <div className="col-6 col-lg-12 p-4 bg-dark">*/}
// {/*    <img className="img-fluid d-block mb-3 mx-auto rounded-circle"*/}
// {/*         src={require("../../img/us/dheeraj.jpeg")} alt="" width="100" />*/}
// {/*    <h4 className="text-light"><b>Sai Dheeraj Gajulapalli</b></h4>*/}
// {/*    <p className="mb-3 text-white">f20171701@hyderabad.bits-pilani.ac.in</p>*/}
// {/*  </div>*/}
// {/*</div>*/}
//
// {/*<div className="col-6 col-lg-3 p-4 bg-dark">*/}
// {/*  <img className="img-fluid d-block mb-3 mx-auto rounded-circle"*/}
// {/*       src={require("../../img/us/baswath.jpg")} alt="" width="100" />*/}
// {/*    <h4 className="text-light"><b>Narkedamilly Bhaswath</b></h4>*/}
// {/*    <p className="mb-3 text-white">f20170033@hyderabad.bits-pilani.ac.in</p>*/}
// {/*</div>*/}
// {/*<div className="col-6 col-lg-3 p-4 bg-dark">*/}
// {/*  <img className="img-fluid d-block mb-3 mx-auto rounded-circle"*/}
// {/*       src={require("../../img/us/rohan.jpg")} alt="" width="100" />*/}
// {/*    <h4 className="text-light"><b>Rohan Kumar B N</b></h4>*/}
// {/*    <p className="mb-3 text-white">f20170024@hyderabad.bits-pilani.ac.in</p>*/}
// {/*</div>*/}
ContactUs.defaultProps = {
  showActions: true
}

ContactUs.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
})
export default connect(mapStateToProps)(ContactUs)
