import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
//import {Link} from 'react-router-dom';



class Team extends Component {
    state = {
      teamName:"",  
      team: [],
      guards: [],
      forwards: [],
      centers: [],
      all: [],
      addbox1: "",
      addbox2: "",
      columns: [
        {
          dataField: 'Player_Name',
          text: 'Name',
          sort: true
        },
        {
          dataField: 'GP',
          text: 'GP',
          sort: true
        },
        {
          dataField: 'PTS',
          text: 'PTS',
          sort: true
        },
        {
          dataField: 'FGM',
          text: 'FGM',
          sort: true
        },
        {
          dataField: 'FGA',
          text: 'FGA',
          sort: true
        },
        {
          dataField: 'FG_PCT',
          text: 'FG%',
          sort: true
        }, 
        {
          dataField: 'FG3M',
          text: '3PTM',
          sort: true
        },
        {
          dataField: 'FTM',
          text: 'FTM',
          sort: true
        },
        {
          dataField: 'FTA',
          text: 'FTA',
          sort: true
        },
        {
          dataField: 'FT_PCT',
          text: 'FT%',
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
      axios.get('/team/' + this.props.match.params.id)
        .then(response1 => {
          axios.get('/pbp/1' + this.props.match.params.id)
            .then(response2 => {
                this.setState({
                    teamName: response1.data.team,
                    team: response1.data.players,
                    guards: response2.data.guards,
                    forwards: response2.data.forwards,
                    centers: response2.data.centers,
                    all: response2.data.all,
                  
                });
            });
        });
    }
    
    render() {
      return (
        <div className="container">
          <h2>{this.state.teamName}</h2>
          <BootstrapTable 
          striped
          hover
          keyField='id' 
          data={ this.state.team } 
          columns={ this.state.columns }
          />
        </div>
      );
    }
  }
  
  export default Team;