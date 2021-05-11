import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Form } from "react-bootstrap";
const queryString = require('query-string');

class Ratings extends Component {
  state = {
    guards: [],
    forwards: [],
    centers: [],
    all: [],
    av: "available",
    sfil:[],
    pos: "all",
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
        sort: true,
        hidden: this.columnhider("PTS")
      },
      {
        dataField: 'FG_PCTrt',
        text: 'FG%',
        sort: true,
        hidden: this.columnhider("FG_PCT")
      }, 
      {
        dataField: 'FG3Mrt',
        text: '3PTM',
        sort: true,
        hidden: this.columnhider("FG3M")
      },
      {
        dataField: 'FT_PCTrt',
        text: 'FT%',
        sort: true,
        hidden: this.columnhider("FT_PCT")
      },
      {
        dataField: 'REBrt',
        text: 'REB',
        sort: true,
        hidden: this.columnhider("REB")
      },
      {
        dataField: 'ASTrt',
        text: 'AST',
        sort: true,
        hidden: this.columnhider("AST")
      },
      {
        dataField: 'STLrt',
        text: 'STL',
        sort: true,
        hidden: this.columnhider("STL")
      },
      {
        dataField: 'BLKrt',
        text: 'BLK',
        sort: true,
        hidden: this.columnhider("BLK")
      },
      {
        dataField: 'TOVrt',
        text: 'TOV',
        sort: true,
        hidden: this.columnhider("TOV")
      },
    ]
  }

  componentDidMount() {
    var params = queryString.parse(this.props.location.search);
    let q = [];
    if(params.hide){
      q.push("hide=" + params.hide);
    }
    if(params.avail){
      q.push("avail=" + params.avail);
    }
    if(q.length){
      q = "?" + q.join("&")
    }
    axios.get('/ratings/' + q)
      .then(response => {
        this.setState({
          guards: response.data.guards,
          forwards: response.data.forwards,
          centers: response.data.centers,
          all: response.data.all,
        });
      });
  }

  
  avtog(val) {
    this.setState({
        av: val,
    })
  }

  ptog(val) {
    this.setState({
        pos: val,
    })
  }

  statstog(val) {
    this.setState({
        sfil: val,
    })
  }

  columnhider(d){
    var params = queryString.parse(this.props.location.search);
    if(params.hide){
      return params.hide.toUpperCase().indexOf(d) > -1;
    }
    return false;
  }

  filterInfo(event){
      event.preventDefault();
      let u = [];
      if(this.state.sfil.length){
        u.push("hide=" + this.state.sfil.join(","));   
      }
      if(this.state.av === "all"){
        u.push("avail=" + this.state.av);   
      }
      if(u.length){
        this.props.history.push('/ratings/?' + u.join("&"));
        this.props.history.go();
      }
  }
  
  render() {

    return (
      <div className="container">
        <h1>Players Ratings</h1>

        <ToggleButtonGroup type="radio" name="options" defaultValue="all" onChange={this.ptog.bind(this)}>
          <ToggleButton value="all" style={{padding: "5px",border: "black 1px solid"}}>All</ToggleButton>
          <ToggleButton value="guards" style={{padding: "5px", border: "black 1px solid"}}>Guards</ToggleButton>
          <ToggleButton value="forwards" style={{padding: "5px", border: "black 1px solid"}}>Forwards</ToggleButton>
          <ToggleButton value="centers" style={{padding: "5px", border: "black 1px solid"}}>Centers</ToggleButton>
        </ToggleButtonGroup>
        <br/>
        <ToggleButtonGroup type="checkbox" onChange={this.statstog.bind(this)} >
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="PTS">PTS</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FG_PCT">FG%</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FG3M">3PTM</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FT_PCT">FT%</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="REB">REB</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="AST">AST</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="STL">STL</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="BLK">BLK</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="TOV">TOV</ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup type="radio" name="availoptions" onChange={this.avtog.bind(this)} defaultValue="available">
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="available">Available</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="all">All</ToggleButton>
        </ToggleButtonGroup>
        <Form onSubmit={this.filterInfo.bind(this)} role="form">
          <Button type="submit">Filter</Button>
        </Form>
        <div className={this.state.pos !== "all" ? 'hidden' : ''}>
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
        <div className={this.state.pos !== "guards" ? 'hidden' : ''}>
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
        <div className={this.state.pos !== "forwards" ? 'hidden' : ''}>
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
        <div className={this.state.pos !== "centers" ? 'hidden' : ''}>
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