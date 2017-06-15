import React from 'react';
import ParentResourceItem from './ParentResourceItem';


export default class ParentResourcePanel extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {

    return (

      <div style={{marginTop: "70px"}}>
        {this.props.resources.map(function (resource, index) {
          return (
            <ParentResourceItem key={index} resourceName={resource}/>
          )
        })}
      </div>

    );
  }
}
