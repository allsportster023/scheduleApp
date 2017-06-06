import React, { Component } from 'react';
import Square from './Square';
import { DropTarget } from 'react-dnd';

const squareTarget = {
  canDrop(props,monitor) {
    return true;
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    item.Date = component.props.date;


    props.dropHandler(item);

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

class DaySquare extends Component {
  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    const black = this.props.black;

    return connectDropTarget(
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Square black={black} date={this.props.date} view={this.props.view} items={this.props.items}/>
        {isOver && !canDrop && this.renderOverlay('red')}
        {!isOver && canDrop && this.renderOverlay('yellow')}
        {isOver && canDrop && this.renderOverlay('green')}
      </div>
    );
  }
}

export default DropTarget('resource', squareTarget, collect)(DaySquare);
