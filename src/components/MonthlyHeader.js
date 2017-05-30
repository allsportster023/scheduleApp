import React, {Component} from 'react';
import {Button, Nav, NavItem, Tab, Container} from 'react-bootstrap';

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

class MonthlyHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const currView = this.props.currentCalType;
    const currTimeframe = this.props.currentTimeframe;

    const currTimeframe2 = this.props.currentTimeframe2;


    //default to MONTH header
    let headerText = this.props.currentTimeframe2[0].format("MMM YYYY");

    if(this.props.currentCalType == 'day' || this.props.currentCalType == 'week') {

      headerText = this.props.currentTimeframe2[0].format("MMM Do") + " ~ " + this.props.currentTimeframe2[1].format("MMM Do, YYYY");

    }

    return (
      <div className="container-fluid">
        <div className="row headerButtonBar">
          <div className="col-md-1">
            <Button className="lightTopMargin" bsSize="small" onClick={this.props.todayAction}>Today</Button>
          </div>

          <div className="col-md-2 col-md-offset-2">
            <Button id="prevButton" className="lightTopMargin" bsSize="small"
                    onClick={this.props.prevNextAction}>Prev</Button>
            <Button id="nextButton" className="lightTopMargin" bsSize="small"
                    onClick={this.props.prevNextAction}>Next</Button>
          </div>
          <div className="col-md-3" style={{marginTop: "9px", color: "red"}}>
            <b>{headerText}</b>
          </div>
          <div className="col-md-3 col-md-offset-1 calTypeTab">
            <Tab.Container id="left-tabs-example" defaultActiveKey="month">
              <Nav bsStyle="pills" onSelect={this.props.calTypeAction}>
                <NavItem eventKey="day">
                  Day
                </NavItem>
                <NavItem eventKey="week">
                  Week
                </NavItem>
                <NavItem eventKey="month">
                  Month
                </NavItem>
              </Nav>
            </Tab.Container>
          </div>
        </div>
        <div className="row" style={{display: "flex"}}>
          {
            daysOfWeek.map(function (day, idx) {
              if(currView == 'month') {
                return <div key={day} className="dayMonthHeader">{day}</div>
              } else
                return <div key={day} className="dayHeader"></div>
            })
          }
        </div>
      </div>
    );
  }
}

export default MonthlyHeader;
