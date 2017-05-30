import React, { Component } from 'react';

export default class Square extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { black, date } = this.props;

    const fill = black ? 'gray' : 'white';

    return (

        <div className="container-fluid boxToHover" style={{ backgroundColor: fill, width: '100%', height: '100%', borderStyle: "solid" }} >
          <div className="row">
            <div className="col-md-12" style={{height: '10px'}}>
              {date ? date.date() : ""}
            </div>
          </div>
        </div>

    );
  }
}
