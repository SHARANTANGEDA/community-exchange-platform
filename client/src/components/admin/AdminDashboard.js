import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import { getDepartments } from '../../actions/authActions'
import { Link } from 'react-router-dom'
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import WarningIcon from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
//core Components
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import GridItem from "./adminComponents/Grid/GridItem.js";
import GridContainer from "./adminComponents/Grid/GridContainer.js";
import Table from "./adminComponents/Table/Table.js";
import Tasks from "./adminComponents/Tasks/Tasks.js";
import CustomTabs from "./adminComponents/CustomTabs/CustomTabs.js";
import Danger from "./adminComponents/Typography/Danger.js";
import Card from "./adminComponents/Card/Card.js";
import CardHeader from "./adminComponents/Card/CardHeader.js";
import CardIcon from "./adminComponents/Card/CardIcon.js";
import CardBody from "./adminComponents/Card/CardBody.js";
import CardFooter from "./adminComponents/Card/CardFooter.js";
import Icon from '@material-ui/core/Icon'
import Warning from './adminComponents/Typography/Warning'
import ChartistGraph from 'react-chartist'
import './adminAssets/css/material-dashboard-react.css'
import { bugs, website, server } from "./adminVariables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "./adminVariables/charts.js";
class AdminDashboard extends Component {

  componentDidMount () {
    this.props.getDepartments(this.props.match.params.id);
    console.log("Called");
  }
  render () {
    const { classes } = this.props;

    return (
      <div className='adminDashboard'>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className=''>Used Space</p>
                <h3 className=''>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className=''>
                  <Danger>
                    <Warning />
                  </Danger>
                  <Link to="" onClick={e => e.preventDefault()}>
                    Get more space
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className=''>Revenue</p>
                <h3 className=''>$34,245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className=''>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className=''>Fixed Issues</p>
                <h3 className=''>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className=''>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className=''>Followers</p>
                <h3 className=''>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className=''>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className=''>Daily Sales</h4>
                <p className=''>
                  <span className=''>
                    <ArrowUpward className='' /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className=''>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className=''>Email Subscriptions</h4>
                <p className=''>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className=''>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className=''>Completed Tasks</h4>
                <p className=''>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className=''>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className=''>Employees Stats</h4>
                <p className=''>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

AdminDashboard.propTypes = {
  getDepartments: PropTypes.func.isRequired,
  hod: PropTypes.object.isRequired,
  auth:PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  hod: state.hod,
  auth: state.auth
})

export default connect(mapStateToProps, { getDepartments })(AdminDashboard)
