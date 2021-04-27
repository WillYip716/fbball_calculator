import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';

class Ratings extends Component {
  state = {
    guards: [],
    forwards: [],
    centers: [],
    all: [],
    toggle: "all",
    columns: [
      {
        dataField: 'Player_Name',
        text: 'Name',
        sort: true
      },
      {
        dataField: 'PosStr',
        text: 'Pos.',
        sort: true
      },
      {
        dataField: 'GP',
        text: 'GP',
        sort: true
      },
      {
        dataField: 'TotalRating',
        text: 'Rating',
        sort: true
      },
      {
        dataField: 'PTSrt',
        text: 'PTS',
        sort: true
      },
      {
        dataField: 'FG_PCTrt',
        text: 'FG%',
        sort: true
      }, 
      {
        dataField: 'FG3Mrt',
        text: '3PTM',
        sort: true
      },
      {
        dataField: 'FT_PCTrt',
        text: 'FT%',
        sort: true
      },
      {
        dataField: 'REBrt',
        text: 'REB',
        sort: true
      },
      {
        dataField: 'ASTrt',
        text: 'AST',
        sort: true
      },
      {
        dataField: 'STLrt',
        text: 'STL',
        sort: true
      },
      {
        dataField: 'BLKrt',
        text: 'BLK',
        sort: true
      },
      {
        dataField: 'TOVrt',
        text: 'TOV',
        sort: true
      },
    ]
  }

  componentDidMount() {
    axios.get('/ratings')
      .then(response => {
        this.setState({
          guards: response.data.guards,
          forwards: response.data.forwards,
          centers: response.data.centers,
          all: response.data.all,
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
        <h1>Players Ratings</h1>

        <ToggleButtonGroup type="radio" name="options" defaultValue="all" onChange={this.changetog.bind(this)}>
          <ToggleButton value="all" style={{padding: "5px",border: "black 1px solid"}}>All</ToggleButton>
          <ToggleButton value="guards" style={{padding: "5px", border: "black 1px solid"}}>Guards</ToggleButton>
          <ToggleButton value="forwards" style={{padding: "5px", border: "black 1px solid"}}>Forwards</ToggleButton>
          <ToggleButton value="centers" style={{padding: "5px", border: "black 1px solid"}}>Centers</ToggleButton>
        </ToggleButtonGroup>
        <div className={this.state.toggle !== "all" ? 'hidden' : ''}>
            <h3>All Players Ratings</h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.all } 
            columns={ this.state.columns }
            pagination={ paginationFactory() }
            />
        </div>
        <div className={this.state.toggle !== "guards" ? 'hidden' : ''}>
            <h3>Guards Relative Ratings</h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.guards } 
            columns={ this.state.columns }
            pagination={ paginationFactory() }
            />
        </div>
        <div className={this.state.toggle !== "forwards" ? 'hidden' : ''}>
            <h3>Forwards Relative Ratings</h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.forwards } 
            columns={ this.state.columns }
            pagination={ paginationFactory() }
            />
        </div>
        <div className={this.state.toggle !== "centers" ? 'hidden' : ''}>
            <h3>Centers Relative Ratings</h3>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.centers } 
            columns={ this.state.columns }
            pagination={ paginationFactory() }
            />
        </div>
      </div>
    );
  }
}

export default Ratings;