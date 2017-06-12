import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import axios from 'axios';
import ResourcePanel from './ResourcePanel';
import MonthlyHeader from './MonthlyHeader';
import MonthViewPanel from './MonthViewPanel';
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
    this.handleScheduledItem = this.handleScheduledItem.bind(this);


    this.state = {
      currentView: 'month',
      focusDate: moment().utc().subtract(moment().day(), 'days').date(1).hour(0).minute(0).second(0).millisecond(0),
      headerDates: [moment().utc().subtract(moment().day(), 'days').date(1).hour(0).minute(0).second(0).millisecond(0),
        moment().utc().subtract(moment().day(), 'days').add(1, 'month').date(1).hour(0).minute(0).second(0).millisecond(0)],
      selectedCalendars: 'all',
      resources: [],
      scheduledItems: []
    }

  }

  componentDidUpdate(nextProps, nextState) {

    if(this.props != nextProps) {
      console.log("ScheduleApp: componentDidUpdate Props");
    }

    if(this.state != nextState){
      console.log("ScheduleApp: componentDidUpdate State");
    }
  }

  componentWillMount(){

    const _this = this;

    axios.all([
      axios.get('http://localhost:8983/solr/scheduleMad/select?indent=on&q=Date:"2017-06-01T00:00:00.000Z"&wt=json'),
      axios.get('http://localhost:8983/solr/scheduleResources/select?indent=on&q=*:*&wt=json')
    ])
      .then(axios.spread(function (madResponse, resResponse) {

        const thisMonthsObjects = resResponse.data.response.docs.map(function (d) {

          d.mad = madResponse.data.response.docs.find(function (f) {
            return f.Make[0] == d.Make[0];
          }).MonthlyAllocationCO[0];

          return d;
        });


        _this.setState({
          resources: thisMonthsObjects
        })
      }));

  }

  handleScheduledItem(item){

    this.state.scheduledItems.push(Object.assign({},item));

    const resourceToReduce = this.state.resources.find(function (e) {
      return item.id == e.id;
    });

    resourceToReduce.mad -= moment.duration(resourceToReduce.DefaultDuration).asHours();

    this.setState({
      scheduledItems: this.state.scheduledItems
    });

  }

  handleTodayClick() {

    let daysToSubtract = 1;

    if (this.state.currentView == 'month') {
      daysToSubtract = moment().utc().date();
    } else if (this.state.currentView == 'week') {
      daysToSubtract = moment().utc().day();
    }

    const firstDay = moment().utc().subtract(daysToSubtract, "days").hour(0).minute(0).second(0).millisecond(0);

    this.setState({
      focusDate: firstDay.hour(0).minute(0).second(0).millisecond(0)
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

    let newFocusDate = moment(this.state.headerDates[0].valueOf() + (this.state.headerDates[1].valueOf() - this.state.headerDates[0].valueOf()) / 2);

    console.log(newFocusDate);

    if (e != this.state.currentView) {
      let daysToSubtract = 0;
      let daysToAdd = 0;

      if (e == 'month') {
        daysToSubtract = newFocusDate.date();
        daysToAdd = newFocusDate.daysInMonth();
      } else if (e == 'week') {
        daysToSubtract = newFocusDate.day() + 1;
        daysToAdd = 8
      } else if (e == 'day') {
        daysToAdd = 1
      }

      const headerFirstDate = newFocusDate.clone();
      headerFirstDate.subtract(daysToSubtract, "days").hour(0).minute(0).second(0).millisecond(0);
      const headerSecondDate = headerFirstDate.clone();
      headerSecondDate.add(daysToAdd, "days").hour(0).minute(0).second(0).millisecond(0);


      console.log(headerFirstDate.toISOString());
      console.log(headerSecondDate.toISOString());

      newFocusDate.subtract(daysToSubtract);


      this.setState({
        currentView: e,
        focusDate: newFocusDate.subtract(daysToSubtract, 'days').hour(0).minute(0).second(0).millisecond(0),
        headerDates: [headerFirstDate, headerSecondDate]
      });
    }
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

  render() {

    let toRender = null;

    if (this.state.currentView == 'day') {
      toRender = <DayViewScrollPanel boxWidth="80%" date={this.state.focusDate}
                                     scheduledItems={this.state.scheduledItems}
                                     scrollHandler={this.changeFieldOfView}
                                     dropHandler={this.handleScheduledItem}/>;
    }
    else if (this.state.currentView == 'week') {
      toRender = <WeekViewScrollPanel boxWidth="12.5%" date={this.state.focusDate}
                                      scheduledItems={this.state.scheduledItems}
                                      scrollHandler={this.changeFieldOfView}
                                      dropHandler={this.handleScheduledItem}/>
    }
    else if (this.state.currentView == 'month') {
      toRender = <MonthViewPanel boxWidth="12.5%" date={this.state.focusDate}
                                 scheduledItems={this.state.scheduledItems}
                                 dropHandler={this.handleScheduledItem} />
    }


    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar">
            <ResourcePanel resources={this.state.resources} currentTimeframe={this.state.focusDate}/>
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

export default DragDropContext(HTML5Backend)(ScheduleApp);
