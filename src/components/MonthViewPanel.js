import React from 'react';
import DaySquare from './DaySquare';
import moment from 'moment';


class MonthViewPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const color = i % 2 === 1;

    let boxNumber = (i + 1) - this.props.date.day();

    let squareDate = this.props.date.clone();
    squareDate.add(boxNumber - 1, 'days');

    const plusOneSquareDate = squareDate.clone().add(1,"days");
    const plusTwoSquareDate = squareDate.clone().add(2,"days");
    const minusOneSquareDate = squareDate.clone().subtract(1,"days");

    //Set defaults (month view)
    let boxHeight = '25%';
    let boxWidth = '14.287%';

    let itemsForDate = [];

    this.props.scheduledItems.forEach(function (itemOrig) {
      let item = Object.assign({},itemOrig);



      let startTimeframe = item.Date.clone();
      startTimeframe.hour(item.DefaultStartHour[0]/100);

      let endTimeframe = startTimeframe.clone();
      endTimeframe.add(moment.duration(item.DefaultDuration));


      if(startTimeframe.isSameOrAfter(squareDate) && endTimeframe.isSameOrBefore(plusOneSquareDate)){
        //One day only needed for this item
        item.StartHour = startTimeframe.hour();
        item.EndHour = endTimeframe.hour();

        if(item.EndHour == 0){
          item.EndHour = 24;
        }
        itemsForDate.push(item);
      }
      else if(startTimeframe.isSameOrBefore(squareDate) && endTimeframe.isSameOrAfter(plusOneSquareDate)){
        //Full day usage here
        item.StartHour = 0;
        item.EndHour = 24;
        itemsForDate.push(item);
        console.log("Full Day");
      }
      else if(startTimeframe.isSameOrBefore(squareDate) && endTimeframe.isSameOrBefore(plusOneSquareDate) && endTimeframe.isAfter(squareDate)){
        //From 0Z to end time
        item.StartHour = 0;
        item.EndHour = endTimeframe.hour();
        itemsForDate.push(item);
      }
      else if(startTimeframe.isSameOrAfter(squareDate) && startTimeframe.isBefore(plusOneSquareDate) && endTimeframe.isSameOrAfter(plusOneSquareDate)){
        //From startTime to 24Z
        console.log("Adding a start to 24 value");
        item.StartHour = startTimeframe.hour();
        item.EndHour = 24;
        itemsForDate.push(item);
      }
      else if(endTimeframe.isSameOrAfter(minusOneSquareDate) && endTimeframe.isSameOrBefore(squareDate)){
        item.dontShow = true;
        item.StartHour = 23;
        item.EndHour = 23;
        itemsForDate.push(item);
      }
      else if(startTimeframe.isSameOrAfter(plusOneSquareDate) && startTimeframe.isSameOrBefore(plusTwoSquareDate)){
        item.dontShow = true;
        item.StartHour = 23;
        item.EndHour = 23;
        itemsForDate.push(item);
      }

    });

    // console.log(itemsForDate);

    return (
      <div key={i} style={{width: boxWidth, height: boxHeight}}>
        <DaySquare black={color} date={squareDate} view="month" dropHandler={this.props.dropHandler}
                   items={itemsForDate}/>
      </div>
    );
  }


  render() {

    const squares = [];

    for (let i = 0; i < 42; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        width: '100%',
        height: '53vh',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {squares}
      </div>
    );
  }
}

export default MonthViewPanel
