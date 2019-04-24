import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LocalOffer from '@material-ui/icons/LocalOffer'
import AccessTime from '@material-ui/icons/AccessTime'
//core Components
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import GridItem from './adminComponents/Grid/GridItem.js'
import GridContainer from './adminComponents/Grid/GridContainer.js'
import Table from './adminComponents/Table/Table.js'
import Card from './adminComponents/Card/Card.js'
import CardHeader from './adminComponents/Card/CardHeader.js'
import CardBody from './adminComponents/Card/CardBody.js'
import CardFooter from './adminComponents/Card/CardFooter.js'
import ChartistGraph from 'react-chartist'
import './adminAssets/css/material-dashboard-react.css'
import classnames from 'classnames'


import { dailySalesChart, } from './adminVariables/charts.js'
import dashboardStyle from './adminAssets/jss/material-dashboard-react/views/dashboardStyle'

// @material-ui/icons
class AdminDashboard extends Component {
  render () {
    const { classes,details,graphDetails,coursesArray } = this.props;
    let tableData=[],series=[],labels=graphDetails.labels;
    // graphDetails.series.forEach(num => {
    //   num=num+25;
    // })
    console.log(graphDetails.series)
    series.push(graphDetails.series);
    coursesArray.forEach(details => {
      tableData.push([details.department.departmentName,details.department.hodEmail,details.noOfCourses.toString()])
    })
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3} className='col-sm-6'>
            <Card style={{backgroundColor:'#00acc1'}}>
              <CardHeader color="warning" stats icon className='text-center'>
                <p className={classes.cardCategory} style={{color:'white'}}>Students</p>
                <h1 className={classnames("text-center imp",{imp:classes.cardTitle})} style={{color:'white', fontWeight:'bold'}}>
                  {details.students}
                </h1>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} style={{color:'white'}}>
                  <LocalOffer />
                  Registered till now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={{backgroundColor:'#f44336'}}>
              <CardHeader color="warning" stats icon className='text-center'>
                <p className={classes.cardCategory} style={{color:'white'}}>Faculty</p>
                <h1 className={classnames("text-center imp",{imp:classes.cardTitle})} style={{color:'white', fontWeight:'bold'}}>
                  {details.faculty}
                </h1>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} style={{color:'white'}}>
                  <LocalOffer />
                  Registered till now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={{backgroundColor:'#4caf50'}}>
              <CardHeader color="warning" stats icon className='text-center'>
                <p className={classes.cardCategory} style={{color:'white'}}>Departments</p>
                <h1 className={classnames("text-center imp",{imp:classes.cardTitle})} style={{color:'white', fontWeight:'bold'}}>
                  {details.departments}
                </h1>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} style={{color:'white'}}>
                  <LocalOffer />
                  Created till now
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card style={{backgroundColor:'#ffa726'}}>
              <CardHeader color="warning" stats icon className='text-center'>
                <p className={classes.cardCategory} style={{color:'white'}}>Questions</p>
                <h1 className={classnames("text-center imp",{imp:classes.cardTitle})} style={{color:'white', fontWeight:'bold'}}>
                  {details.questions}
                </h1>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} style={{color:'white'}}>
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
                  data={{series,labels}}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Questions per day over last week</h4>
              </CardBody>
              {/*<CardFooter chart>*/}
              {/*  <div className={classes.stats}>*/}
              {/*    <AccessTime /> Questions asked daily in a week*/}
              {/*  </div>*/}
              {/*</CardFooter>*/}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card className="scrollbar  scrollbar-warning force-overflow">
              {/*<CardHeader color="warning">*/}
              {/*  <h4 className={classes.cardTitleWhite}>Employees Stats</h4>*/}
              {/*  <p className={classes.cardCategoryWhite}>*/}
              {/*    New employees on 15th September, 2016*/}
              {/*  </p>*/}
              {/*</CardHeader>*/}
              <CardBody >
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
