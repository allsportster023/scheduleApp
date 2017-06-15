import React, {Component} from 'react';
import ResourcePanel from './ResourcePanel'
import axios from 'axios';

class ParentResourceItem extends Component {

  constructor(props) {
    super(props);

    this.madValues = [];

    this.state = {
      subResources: [],
      allocations: {}
    }
  }

  componentDidMount() {
    const _this = this;

    axios.all([
      axios.get('http://localhost:8983/solr/scheduleMad/select?indent=on&q=Date:"2017-06-01T00:00:00.000Z"&wt=json'),
      axios.get('http://localhost:8983/solr/scheduleResources/select?indent=on&q=Make:' + this.props.resourceName + '&wt=json')
    ])
      .then(axios.spread(function (madResponse, resResponse) {

        // let fakeMadData = [{"CO":5},{"NM":1},{"TX":7},{"WI":15}];
        let fakeMadData = {"CO": 5, "NM": 1, "TX": 7, "WI": 15};

        // this.madValues = madResponse.data.response.docs.MonthlyAllocation;

        _this.setState({
          subResources: resResponse.data.response.docs.sort(),
          allocations: fakeMadData
        })
      }));
  }


  render() {
    const _this = this;

    return (<div style={{
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: '20px',
      textAlign: 'center',
      backgroundColor: "#dddddd"
    }}>
      <div className="container-fluid">
        <div className="row parentBar">
          <div className={"panel-heading col-md-2 " + this.props.resourceName + "BarColor"}
               style={{padding: "0px", margin: "0px"}}>
            <a className="glyphicon glyphicon-menu-right" style={{color: "black"}} data-toggle="collapse"
               href={"#collapse" + this.props.resourceName}></a>
          </div>
          <div className="col-md-5">
            <a data-toggle="collapse" href={"#collapse" + this.props.resourceName}>
              {this.props.resourceName}
            </a>
          </div>
          {Object.keys(this.madValues).map(function (key) {
            console.log(key);
            return (
              <div className="col-md-1" style={{fontSize: "12px", padding: "0px", marginLeft: "3px"}}>
                <div>{key}</div>
                <div>{_this.madValues[key]}</div>
              </div>)
          })}
        </div>
        <div className="collapse collapseDiv" id={"collapse" + this.props.resourceName}>
          <ResourcePanel resources={this.state.subResources}/>
        </div>

      </div>
    </div>)
  }
}

export default ParentResourceItem;
