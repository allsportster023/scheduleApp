import React from 'react';
import ReactList from 'react-list';

class WeekViewScrollPanel extends React.Component {

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.changeRefs = this.changeRefs.bind(this);

  }


  renderItem(index, key) {

    let thisItemDate = this.props.date.clone();
    thisItemDate.add(index-5003, 'days');

    return <div key={key} className={'monthItem item' + (index % 2 ? '' : ' even')}>
      <div style={{verticalAlign: 'top', lineHeight: '25px'}}>
        <b>{thisItemDate.format("ddd  M/D")}</b>
      </div>
      <div style={{height: '275px'}}>
        HI
      </div>
    </div>;
  }

  changeRefs(){
    return this.props.scrollHandler(this.monthList.getVisibleRange())
  }

  renderExamples() {
    return <div className={`example axis-x`}>
        <div className='component' onScroll={this.changeRefs}>
          <ReactList axis={'x'}
                     ref={c => this.monthList = c}
                     length={10000}
                     initialIndex={5000}
                     itemRenderer={this.renderItem}
                     type='uniform'
          />
        </div>
      </div>;
  }

  render() {
    return (
      <div className='index'>
        {this.renderExamples()}
      </div>
    );
  }
}

export default WeekViewScrollPanel
