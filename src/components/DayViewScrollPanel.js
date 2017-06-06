import React from 'react';
import ReactList from 'react-list';
import DaySquare from './DaySquare';


class DayViewScrollPanel extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.changeRefs = this.changeRefs.bind(this);
  }

  renderItem(index, key) {

    let thisItemDate = this.props.date.clone();
    thisItemDate.add(index - 5000, 'days');

    const color = index % 2 === 1;

    let itemsForDate = [];

    this.props.scheduledItems.forEach(function (item) {
      if (item.Date.isSame(thisItemDate)) {
        itemsForDate.push(item);
      }
    });

    return <div id={thisItemDate.format("YYYY-MM-DD")} key={key} className={'dayItem ' + (index % 2 ? '' : ' even')} >
      <DaySquare black={color} date={thisItemDate} view="day" dropHandler={this.props.dropHandler} items={itemsForDate}/>
    </div>;
  }

  changeRefs() {
    return this.props.scrollHandler(this.list.getVisibleRange())
  }

  render() {
    return (
      <div className='index'>
        <div className={`axis-x`}>
          <div className='component' onScroll={this.changeRefs}>
            <ReactList axis={'x'}
                       ref={c => this.list = c}
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

export default DayViewScrollPanel
