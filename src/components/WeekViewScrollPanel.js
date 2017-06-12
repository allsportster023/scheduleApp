import React from 'react';
import ReactList from 'react-list';
import DaySquare from './DaySquare';
import moment from 'moment';


class WeekViewScrollPanel extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.changeRefs = this.changeRefs.bind(this);
  }

  renderItem(index, key) {

    let squareDate = this.props.date.clone();
    squareDate.add(index - 5003, 'days');

    const plusOneSquareDate = squareDate.clone().add(1,"days");
    const plusTwoSquareDate = squareDate.clone().add(2,"days");
    const minusOneSquareDate = squareDate.clone().subtract(1,"days");

    const color = index % 2 === 1;

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

    return <div id={squareDate.format("YYYY-MM-DD")} key={key} className={'monthItem ' + (index % 2 ? '' : ' even')} >
        <DaySquare black={color} date={squareDate} view="week" dropHandler={this.props.dropHandler} items={itemsForDate}/>
    </div>;
  }

  changeRefs() {
    return this.props.scrollHandler(this.monthList.getVisibleRange())
  }

  render() {
    return (
      <div className='index'>
        <div className={`axis-x`}>
          <div className='component' onScroll={this.changeRefs}>
            <ReactList axis={'x'}
                       ref={c => this.monthList = c}
                       length={10000}
                       initialIndex={5000}
                       itemRenderer={this.renderItem}
                       type='uniform'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default WeekViewScrollPanel
