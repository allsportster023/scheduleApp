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
        marginTop: '10px',
        textAlign: 'center',
        backgroundColor: "darkgray"
      }}>
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className={"col-sm-2 "+this.props.resource.Make + "BarColor"}>
              i
            </div>
            <div className="col-sm-7">
              {this.props.resource.Registration.toString()}
            </div>
            <div className="col-sm-3" style={{fontSize: "13px", padding:"-5px"}}>
              <div>CO</div>
              <div>{this.props.resource.mad}</div>
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
