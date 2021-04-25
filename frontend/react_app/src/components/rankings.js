import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class Rankings extends Component {
  state = {
    avg: [],
    tot: [],
    avgrank: [],
    totrank: [],
    toggle: "average",
    rankcolumns: [
      {
        dataField: 'team',
        text: 'Team Name',
        sort: true
      },
      {
        dataField: 'PTS',
        text: 'PTS RNK',
        sort: true
      },
      {
        dataField: 'FG_PCT',
        text: 'FG% RNK',
        sort: true
      },
      {
        dataField: 'FT_PCT',
        text: 'FT% RNK',
        sort: true
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM RNK',
        sort: true
      },
      {
        dataField: 'REB',
        text: 'REB RNK',
        sort: true
      },
      {
        dataField: 'AST',
        text: 'AST RNK',
        sort: true
      },
      {
        dataField: 'STL',
        text: 'STL RNK',
        sort: true
      },
      {
        dataField: 'BLK',
        text: 'BLK RNK',
        sort: true
      },
      {
        dataField: 'TOV',
        text: 'TOV RNK',
        sort: true
      },
      {
        dataField: 'rottotal',
        text: 'ROT Score',
        sort: true
      },
    ],
    columns: [
      {
        dataField: 'team',
        text: 'Team Name',
        sort: true
      },
      {
        dataField: 'PTS',
        text: 'PTS',
        sort: true
      },
      {
        dataField: 'FG_PCT',
        text: 'FG%',
        sort: true
      },
      {
        dataField: 'FT_PCT',
        text: 'FT%',
        sort: true
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM',
        sort: true
      },
      {
        dataField: 'REB',
        text: 'REB',
        sort: true
      },
      {
        dataField: 'AST',
        text: 'AST',
        sort: true
      },
      {
        dataField: 'STL',
        text: 'STL',
        sort: true
      },
      {
        dataField: 'BLK',
        text: 'BLK',
        sort: true
      },
      {
        dataField: 'TOV',
        text: 'TOV',
        sort: true
      },
    ]
  }

  componentDidMount() {
    axios.get('/calculate')
      .then(response => {
        this.setState({
            avg: response.data.avg,
            tot: response.data.tot,
            avgrank: response.data.rankavg,
            totrank: response.data.ranktot,
        });
      });
  }

  changetog(val) {
    this.setState({
        toggle: val,
    })
  }
  
  render() {

    return (
      <div className="container">
        <h1>Rankings</h1>

        <ToggleButtonGroup type="radio" name="options" defaultValue="average" onChange={this.changetog.bind(this)}>
          <ToggleButton value="average" style={{padding: "5px",border: "black 1px solid"}}>Team Average</ToggleButton>
          <ToggleButton value="total" style={{padding: "5px", border: "black 1px solid"}}>Team Remaining Total</ToggleButton>
          <ToggleButton value="avgrank" style={{padding: "5px", border: "black 1px solid"}}>Team Average Rank</ToggleButton>
          <ToggleButton value="totrank" style={{padding: "5px", border: "black 1px solid"}}>Team Total Rank</ToggleButton>
        </ToggleButtonGroup>
        <div className={this.state.toggle !== "average" ? 'hidden' : ''}>
            <h3>Team Average Stats </h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.avg } 
            columns={ this.state.columns }
            />
        </div>
        <div className={this.state.toggle !== "total" ? 'hidden' : ''}>
            <h3>Totals Future Stats</h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.tot } 
            columns={ this.state.columns }
            />
        </div>
        <div className={this.state.toggle !== "avgrank" ? 'hidden' : ''}>
            <h3>Average Stats Rankings</h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.avgrank } 
            columns={ this.state.rankcolumns }
            />
        </div>
        <div className={this.state.toggle !== "totrank" ? 'hidden' : ''}>
            <h3>Total Stats Rankings</h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.totrank } 
            columns={ this.state.rankcolumns }
            />
        </div>
      </div>
    );
  }
}

export default Rankings;