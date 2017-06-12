import React from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";


class TimelineRect extends React.Component {

  constructor(props) {
    super(props);

    this.createContextMenu = this.createContextMenu.bind(this);

  }

  createContextMenu(e) {

    console.log("Rendering Context Menu in Square");
    e.preventDefault();

  }

  render() {

    const item = this.props.item;
    const i = this.props.index;
    const height = this.props.height;
    const hourlyWidth = this.props.hourlyWidth;
    const date = this.props.date;

    const _this = this;

    return (
      <g key={"g" + i} id={"svgGroup" + i}>
          <rect className={(item.dontShow ? "no" : "")+"rectBar context-menu-one " + item.Make + "BarColor"} key={i}
                x={(item.StartHour) * hourlyWidth}
                y={(height + 3) * i} width={((item.EndHour) - (item.StartHour)) * hourlyWidth}
                height={height} onContextMenu={(e) => _this.createContextMenu(e)}>
            <title>{"Category: " + item.Category +
            "\nDuration: " + item.DefaultDuration +
            "\nStart Hour: " + item.DefaultStartHour +
            "\nEnd Hour: " + item.DefaultEndHour +
            "\nMake: " + item.Make +
            "\nRegistration: " + item.Registration}</title>
          </rect>
          <text className={(item.dontShow ? "no" : "")+"rectText"} style={{fontSize: height * 0.8}}
                x={(item.StartHour) * hourlyWidth + 3} y={(height + 3) * i + (height * 0.8)}
                onContextMenu={(e) => _this.createContextMenu(e)}>
            {date.format() == item.Date.format() ? item.Make : ""}
          </text>

      </g>
    )
  }
}

export default TimelineRect
