import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import { getDepartments } from '../../actions/authActions'
import { Link } from 'react-router-dom'
// @material-ui/icons

import LocalOffer from "@material-ui/icons/LocalOffer";
import AccessTime from "@material-ui/icons/AccessTime";
//core Components
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "./adminComponents/Grid/GridItem.js";
import GridContainer from "./adminComponents/Grid/GridContainer.js";
import Table from "./adminComponents/Table/Table.js";
import Card from "./adminComponents/Card/Card.js";
import CardHeader from "./adminComponents/Card/CardHeader.js";
import CardBody from "./adminComponents/Card/CardBody.js";
import CardFooter from "./adminComponents/Card/CardFooter.js";
import ChartistGraph from 'react-chartist'
import './adminAssets/css/material-dashboard-react.css'

import {
  dailySalesChart,
} from "./adminVariables/charts.js";
import dashboardStyle from './adminAssets/jss/material-dashboard-react/views/dashboardStyle'
import Grid from '@material-ui/core/Grid'
class AdminDashboard extends Component {
  render () {
    const { classes,details,graphDetails,coursesArray } = this.props;
    let tableData=[];
    coursesArray.map(details => {
      tableData.push([details.department.departmentName,details.department.hodEmail,details.noOfCourses.toString()])
    })
    return (
      <div>
        <GridContainer>
          <Grid xs={12} sm={6} md={3} className='col-sm-6'>
            <Card>
              <CardHeader color="warning" stats icon>
                <p className={classes.cardCategory}>Students</p>
                <h3 className={classes.cardTitle}>
                  {details.students}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Registered till now
                </div>
              </CardFooter>
            </Card>
          </Grid>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <p className={classes.cardCategory}>Faculty</p>
                <h3 className={classes.cardTitle}>
                  {details.faculty}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Registered till now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <p className={classes.cardCategory}>Departments</p>
                <h3 className={classes.cardTitle}>
                  {details.departments}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Created till now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <p className={classes.cardCategory}>Questions</p>
                <h3 className={classes.cardTitle}>
                  {details.questions}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Asked till now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer className='d-flex justify-content-center'>
          <GridItem xs={12} sm={12} md={6} >
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={graphDetails}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Weekly Stats</h4>

              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Questions asked daily in a week
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["Department Name", "Hod Email", "Number of Courses"]}
                  tableData={tableData}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

//
// {/*<GridContainer>*/}
// {/*  <GridItem xs={12} sm={12} md={6}>*/}
// {/*    <CustomTabs*/}
// {/*      title="Tasks:"*/}
// {/*      headerColor="primary"*/}
// {/*      tabs={[*/}
// {/*        {*/}
// {/*          tabName: "Bugs",*/}
// {/*          tabIcon: BugReport,*/}
// {/*          tabContent: (*/}
// {/*            <Tasks*/}
// {/*              checkedIndexes={[0, 3]}*/}
// {/*              tasksIndexes={[0, 1, 2, 3]}*/}
// {/*              tasks={bugs}*/}
// {/*            />*/}
// {/*          )*/}
// {/*        },*/}
// {/*        {*/}
// {/*          tabName: "Website",*/}
// {/*          tabIcon: Code,*/}
// {/*          tabContent: (*/}
// {/*            <Tasks*/}
// {/*              checkedIndexes={[0]}*/}
// {/*              tasksIndexes={[0, 1]}*/}
// {/*              tasks={website}*/}
// {/*            />*/}
// {/*          )*/}
// {/*        },*/}
// {/*        {*/}
// {/*          tabName: "Server",*/}
// {/*          tabIcon: Cloud,*/}
// {/*          tabContent: (*/}
// {/*            <Tasks*/}
// {/*              checkedIndexes={[1]}*/}
// {/*              tasksIndexes={[0, 1, 2]}*/}
// {/*              tasks={server}*/}
// {/*            />*/}
// {/*          )*/}
// {/*        }*/}
// {/*      ]}*/}
// {/*    />*/}
// {/*  </GridItem>*/}

// {/*</GridContainer>*/}

//
// {/*<GridItem xs={12} sm={12} md={4}>*/}
// {/*  <Card chart>*/}
// {/*    <CardHeader color="warning" >*/}
// {/*      <ChartistGraph*/}
// {/*        className="ct-chart"*/}
// {/*        data={emailsSubscriptionChart.data}*/}
// {/*        type="Bar"*/}
// {/*        options={emailsSubscriptionChart.options}*/}
// {/*        responsiveOptions={emailsSubscriptionChart.responsiveOptions}*/}
// {/*        listener={emailsSubscriptionChart.animation}*/}
// {/*      />*/}
// {/*    </CardHeader>*/}
// {/*    <CardBody>*/}
// {/*      <h4 className={classes.cardTitle}>Email Subscriptions</h4>*/}
// {/*      <p className={classes.cardCategory}>*/}
// {/*        Last Campaign Performance*/}
// {/*      </p>*/}
// {/*    </CardBody>*/}
// {/*    <CardFooter chart>*/}
// {/*      <div className={classes.stats}>*/}
// {/*        <AccessTime /> campaign sent 2 days ago*/}
// {/*      </div>*/}
// {/*    </CardFooter>*/}
// {/*  </Card>*/}
// {/*</GridItem>*/}
//
// {/*<GridItem xs={12} sm={12} md={4}>*/}
// {/*  <Card chart>*/}
// {/*    <CardHeader color="danger">*/}
// {/*      <ChartistGraph*/}
// {/*        className="ct-chart"*/}
// {/*        data={completedTasksChart.data}*/}
// {/*        type="Line"*/}
// {/*        options={completedTasksChart.options}*/}
// {/*        listener={completedTasksChart.animation}*/}
// {/*      />*/}
// {/*    </CardHeader>*/}
// {/*    <CardBody>*/}
// {/*      <h4 className={classes.cardTitle}>Completed Tasks</h4>*/}
// {/*      <p className={classes.cardCategory}>*/}
// {/*        Last Campaign Performance*/}
// {/*      </p>*/}
// {/*    </CardBody>*/}
// {/*    <CardFooter chart>*/}
// {/*      <div className={classes.stats}>*/}
// {/*        <AccessTime /> campaign sent 2 days ago*/}
// {/*      </div>*/}
// {/*    </CardFooter>*/}
// {/*  </Card>*/}
// {/*</GridItem>*/}
AdminDashboard.propTypes = {
  details:PropTypes.object.isRequired,
  graphDetails:PropTypes.object.isRequired,
  coursesArray:PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(dashboardStyle)(AdminDashboard)
