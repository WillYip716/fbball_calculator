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
    toggle: "average",
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
        <h3>Team Projected Rankings</h3>

        <ToggleButtonGroup type="radio" name="options" defaultValue="average" onChange={this.changetog.bind(this)}>
          <ToggleButton value="average" style={{padding: "5px"}}>Team Average</ToggleButton>
          <ToggleButton value="total" style={{padding: "5px"}}>Team Remaining Total</ToggleButton>
        </ToggleButtonGroup>
        <div className={this.state.toggle === "total" ? 'hidden' : ''}>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.avg } 
            columns={ this.state.columns }
            />
        </div>
        <div className={this.state.toggle === "average" ? 'hidden' : ''}>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.tot } 
            columns={ this.state.columns }
            />
        </div>
      </div>
    );
  }
}

export default Rankings;