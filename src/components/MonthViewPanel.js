import React from 'react';
import DaySquare from './DaySquare';
import ReactList from 'react-list';


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

    //Set defaults (month view)
    let boxHeight = '25%';
    let boxWidth = '14.287%';

    let itemsForDate = [];

    this.props.scheduledItems.forEach(function (item) {
      if (item.Date.isSame(squareDate)) {
        console.log("Same Day");
        itemsForDate.push(item);
      }
    });

    return (
      <div key={i} style={{width: boxWidth, height: boxHeight}} onClick={() => console.log(squareDate)}>
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
