import React from 'react';
import ScheduleApp from './ScheduleApp';

let colorMap = {};


let alreadyCreatedColors= false;

class AppMain extends React.Component {

  constructor(props) {
    super(props);

    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleTimeframeChange = this.handleTimeframeChange.bind(this);


    this.state = {
      sources: [],
      timeframe: [new Date('2017-01-13') - (86400000 * 14), new Date('2017-01-13')],
      categories: [],
      codes: []
    }
  }

  componentDidUpdate(nextProps, nextState) {
    console.log("AppMain: Component Did Update");

    if (this.state.sources.length != 0 &&
      this.state.timeframe.length != 0 &&
      this.state.categories.length != 0 &&
      this.state.codes.length != 0) {

      console.log(this.state.sources);
      console.log(this.state.timeframe);
      console.log(this.state.categories);
      console.log(this.state.codes);

      let goldenRatio = 0.618033988749895;

      if(!alreadyCreatedColors) {


        this.state.sources.forEach(function (d,i) {
          var startVal = 10.1;
          startVal += goldenRatio*i;
          startVal %= 1;
          colorMap[d] = "hsl("+(360*startVal)+", 90%, 50%)";
        });

        this.state.categories.forEach(function (d,i) {
          let startVal = 100.1;
          startVal += goldenRatio*i;
          startVal %= 1;
          colorMap[d] = "hsl("+(360*startVal)+", 60%, 55%)";
        });

        this.state.codes.forEach(function (d,i) {
          let startVal = 1000.1;
          startVal += goldenRatio*i;
          startVal %= 1;
          colorMap[d] = "hsl("+(360*startVal)+", 40%, 60%)";

        });

        alreadyCreatedColors = true;

      }

      var firstDate = new Date(this.state.timeframe[0]);
      var secondDate = new Date(this.state.timeframe[1]);

      var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(86400000)));

      //For each day, figure out the correct color
      for(var i = 0; i <= diffDays; i++){
        let thisDate = new Date(firstDate.valueOf());
        thisDate.setDate(firstDate.getDate() + i);

        let milliDate = Date.parse(thisDate.getUTCFullYear() + "-" +
          ("0" + (thisDate.getUTCMonth()+1)).slice(-2) + "-" +
          ("0" + thisDate.getUTCDate()).slice(-2));

        let startVal = 500.1;
        startVal += goldenRatio*parseInt(milliDate.toString().slice(0,6));
        startVal %= 1;
        colorMap[new Date(milliDate).toISOString().slice(0,19)+"Z"] = "hsl(187, "+(100*startVal)+"%, "+(100*startVal)+"%)";

      }


    } else {
      console.log("One of the states is empty. No need to fetch anything");
    }
  }

  handleSourceChange(e) {

    console.log("AppMain: Handling SOURCE change");
    this.setState({
      sources: e.sort()
    });
  }


  handleCategoryChange(e) {

    console.log("Handling CATEGORY change");
    this.setState({
      categories: e.sort()
    });
  }

  handleCodeChange(e) {

    console.log("AppMain: Handling CODE change");
    this.setState({
      codes: e.sort()
    });
  }

  handleTimeframeChange(start, end) {

    console.log("AppMain: Handling TIME change");

    const timeArr = this.state.timeframe;

    //If the start time is to be chagned
    if (start) {
      timeArr[0] = start;
    }

    //If the end time is to be changed
    if (end) {
      timeArr[1] = end;
    }

    console.log(timeArr);

    //Make sure that the end time is after the start time
    if (timeArr[0] < timeArr[1]) {

      this.setState({
        timeframe: timeArr
      });

    } else {
      //Alert the user that they have to select an
      //end that is later than the start time
      console.log("AppMain: End is before start");
      alert("End Time must be after Before Time");

    }
  }


  render() {

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 sidebar">
            <ScheduleApp />
          </div>
        </div>
      </div>
    )
  }
}

export default AppMain
