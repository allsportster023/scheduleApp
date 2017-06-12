import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {DragSource} from 'react-dnd';

const dragSource = {

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
    const {connectDragSource, isDragging} = this.props;
    return connectDragSource(
      <div style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        marginTop: '20px',
        textAlign: 'center',
        backgroundColor: "darkgray"
      }}>
        <div className="container-fluid">
          <div className="row">
            <div className={"col-md-2 "+this.props.resource.Make + "BarColor"}>
              i
            </div>
            <div className="col-md-3 col-md-offset-0">
              {this.props.resource.Make.toString()}
            </div>
            <div className="col-md-3 col-md-offset-4" style={{fontSize: "15px", paddingTop:"7px"}}>
              {this.props.resource.mad}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResourceItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
};

export default DragSource('resource', dragSource, collect)(ResourceItem);
