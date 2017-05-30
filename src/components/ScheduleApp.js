import React, {Component} from 'react';
import Square from './Square';
import MonthlyHeader from './MonthlyHeader';
import WeekViewScrollPanel from './WeekViewScrollPanel';
import DayViewScrollPanel from './DayViewScrollPanel';
import moment from 'moment';


class ScheduleApp extends React.Component {

  constructor(props) {
    super(props);

    this.handleTodayClick = this.handleTodayClick.bind(this);
    this.handleDatePageClick = this.handleDatePageClick.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.changeFieldOfView = this.changeFieldOfView.bind(this);


    this.state = {
      currentView: 'month',
      focusDate: moment().subtract(moment().day(), 'days').date(1).hour(0).minute(0).second(0).millisecond(0),
      headerDates: [moment().subtract(moment().day(), 'days').date(1).hour(0).minute(0).second(0).millisecond(0),
        moment().subtract(moment().day(), 'days').add(1, 'month').date(1).hour(0).minute(0).second(0).millisecond(0)]
    }

  }

  handleTodayClick() {

    let daysToSubtract = 1;

    if (this.state.currentView == 'month') {
      daysToSubtract = moment().date();
    } else if (this.state.currentView == 'week') {
      daysToSubtract = moment().day();
    }

    const firstDay = moment().subtract(daysToSubtract, "days").hour(0).minute(0).second(0).millisecond(0);

    console.log(daysToSubtract);
    console.log(firstDay);


    this.setState({
      focusDate: moment().hour(0).minute(0).second(0).millisecond(0)
    })

  }

  handleDatePageClick(e) {
    if (e.target.id == "prevButton") {

      this.setState({
        focusDate: this.state.focusDate.subtract(1, this.state.currentView + "s").hour(0).minute(0).second(0).millisecond(0)
      })

    } else if (e.target.id == "nextButton") {

      this.setState({
        focusDate: this.state.focusDate.add(1, this.state.currentView + "s").hour(0).minute(0).second(0).millisecond(0)
      })

    }

  }

  handleCalendarChange(e) {

    console.log(this.state.focusDate);

    if (e != this.state.currentView) {
      let daysToSubtract = 0;

      if (e == 'month') {
        daysToSubtract = this.state.focusDate.date()
      } else if (e == 'week') {
        daysToSubtract = this.state.focusDate.day();
      }


      this.setState({
        currentView: e,
        focusDate: this.state.focusDate.subtract(daysToSubtract, "days").hour(0).minute(0).second(0).millisecond(0),
        headerDates: [this.state.focusDate.subtract(daysToSubtract, "days").hour(0).minute(0).second(0).millisecond(0),
          this.state.focusDate.subtract(daysToSubtract, "days").hour(0).minute(0).second(0).millisecond(0)]
      });
    }
  }

  renderSquare(i, viewType) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const color = i % 2 === 1;

    let boxNumber = (i + 1) - this.state.focusDate.day();

    let squareDate = this.state.focusDate.clone();
    squareDate.add(boxNumber - 1, 'days');

    //Set defaults (month view)
    let boxHeight = '25%';
    let boxWidth = '14.287%';

    if (viewType == 'day') {
      boxHeight = '100%';
      boxWidth = '100%';
    } else if (viewType == 'week') {
      boxHeight = '100%';
    }

    return (
      <div key={i} style={{width: boxWidth, height: boxHeight}} onClick={() => this.handleSquareClick(x, y)}>
        <Square black={color} date={squareDate}/>
      </div>
    );
  }

  changeFieldOfView(e) {

    let startIndex = 5000;

    if (this.state.currentView == 'week')
      startIndex = 5003;

    let dumbMutableDate1 = this.state.focusDate.clone();
    let dumbMutableDate2 = this.state.focusDate.clone();

    dumbMutableDate1.add(e[0] - startIndex, 'days');
    dumbMutableDate2.add(e[1] - startIndex, 'days');

    let dateArray = [dumbMutableDate1, dumbMutableDate2];

    if (!this.state.headerDates[0].isSame(dateArray[0]) || !this.state.headerDates[1].isSame(dateArray[1])) {
      console.log("UPDATE THE STUFF!!");

      this.setState({
        headerDates: dateArray
      });
    }

  }

  changeHeader(){

  }

  render() {
    const squares = [];
    let neededSquares = 42;

    let toRender = <div style={{
      width: '100%',
      height: '53vh',
      display: 'flex',
      flexWrap: 'wrap'
    }}>
      {squares}
    </div>;

    if (this.state.currentView == 'day') {
      toRender = <DayViewScrollPanel boxWidth="80%" date={this.state.focusDate}
                                     scrollHandler={this.changeFieldOfView}
                                     currentCalType={this.state.currentView}/>;
    }
    else if (this.state.currentView == 'week') {
      toRender = <WeekViewScrollPanel boxWidth="12.5%" date={this.state.focusDate}
                                 scrollHandler={this.changeFieldOfView}
                                 currentCalType={this.state.currentView}/>
    }

    for (let i = 0; i < neededSquares; i++) {
      squares.push(this.renderSquare(i, this.state.currentView));
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar">
          </div>
          <div className="col-md-8 sidebar">
            <MonthlyHeader
              currentTimeframe={this.state.focusDate}
              currentTimeframe2={this.state.headerDates}
              todayAction={this.handleTodayClick}
              prevNextAction={this.handleDatePageClick}
              calTypeAction={this.handleCalendarChange}
              currentCalType={this.state.currentView}
            />
            {toRender}
          </div>
          <div className="col-md-2 sidebar">
          </div>
        </div>
      </div>
    );
  }
}

export default ScheduleApp;
