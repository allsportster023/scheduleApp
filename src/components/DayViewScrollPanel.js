import React from 'react';
import ReactList from 'react-list';

class DayViewScrollPanel extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.changeRefs = this.changeRefs.bind(this);
  }

  renderItem(index, key) {

    let thisItemDate = this.props.date.clone();
    thisItemDate.add(index - 5000, 'days');

    return <div id={thisItemDate.format("YYYY-MM-DD")} key={key}
                className={'dayItem item' + (index % 2 ? '' : ' even')}>
      <div style={{verticalAlign: 'top', lineHeight: '25px', textAlign: "left"}}>
        <b>{thisItemDate.format("ddd  M/D")}</b>
      </div>
      <div style={{height: '275px'}}>
        HI
      </div>
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
