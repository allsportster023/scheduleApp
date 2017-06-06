import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const knightSource = {

  beginDrag(props, monitor, component) {
    // Return the data describing the dragged item
    return props.resource;
  },

  endDrag(props, monitor, component) {

    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();

    // console.log(item);

  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class ResourceItem extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        marginTop: '30px',
        textAlign: 'center',
        backgroundColor: "darkgray"
      }}>
        {this.props.resource.Registration.toString()}
      </div>
    );
  }
}

ResourceItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('resource', knightSource, collect)(ResourceItem);
