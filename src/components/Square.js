import React, {Component} from 'react';

export default class Square extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const fill = this.props.black ? 'gray' : 'white';

    let dateFormat = "ddd M/D";
    let boxHeightValue = 250;
    let boxWidthValue = 0;
    let barHeight = 15;


    if (this.props.view == 'month') {
      dateFormat = "D";
      boxHeightValue = 40;
      boxWidthValue = 140;
    } else if (this.props.view == 'week') {
      boxWidthValue = 115;
      barHeight = 30;
    } else if (this.props.view == 'day') {
      boxWidthValue = 900;
      barHeight = 30;
    }

    const hourlyWidth = boxWidthValue / 24.0;

    const _this = this;

    return (

      <div className="container-fluid boxToHover"
           style={{backgroundColor: fill, width: '100%', height: '100%', borderStyle: "solid"}}>
        <div className="row">
          <div className="col-md-12" style={{height: '18px', lineHeight: '18px'}}>
            {this.props.date ? this.props.date.format(dateFormat) : ""}
          </div>
        </div>
        <div className="row" style={{height: "95%"}}>
          <svg width="100%" height="100%">
            {this.props.items.map(function (i, d) {
              if ((_this.props.items.length * 15 > boxHeightValue)) {
                barHeight = (boxHeightValue / _this.props.items.length) - 1;
              }

              return <rect className="rectBar" key={d} x={(i.DefaultStartHour[0] / 100) * hourlyWidth}
                           y={(barHeight + 3) * d} width={((i.DefaultEndHour[0] / 100)-(i.DefaultStartHour[0] / 100)) * hourlyWidth}
                           height={barHeight} style={{fill: "red", stroke: "black", strokeWidth: "2", opacity: "0.5"}}>
                <title>{"Category: " + i.Category +
                        "\nDuration: " + i.DefaultDuration +
                        "\nStart Hour: " + i.DefaultStartHour +
                        "\nEnd Hour: " + i.DefaultEndHour +
                        "\nMake: " + i.Make +
                        "\nRegistration: " + i.Registration}</title>
              </rect>
            })}
            Sorry, your browser does not support inline SVG.
          </svg>
        </div>
      </div>

    );
  }
}
