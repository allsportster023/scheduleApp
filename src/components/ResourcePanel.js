import React from 'react';
import { DragSource } from 'react-dnd';
import ResourceItem from './ResourceItem';

export default class ResourcePanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (

      <div style={{marginTop: "10px"}}>
        {this.props.resources.map(function (resource, index) {
          return (
            <ResourceItem key={index} resource={resource}/>
          )
        })}
      </div>

    );
  }
}
