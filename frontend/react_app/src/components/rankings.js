import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"

class Rankings extends Component {
  state = {
    teams: [],
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
    axios.get('/calculate/total')
      .then(response => {
        this.setState({
            teams: response.data
        });
      });
  }
  
  render() {
    return (
      <div className="container">
        <h3>Team Projected Rankings</h3>
        <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ this.state.teams } 
        columns={ this.state.columns }
        />
      </div>
    );
  }
}

export default Rankings;