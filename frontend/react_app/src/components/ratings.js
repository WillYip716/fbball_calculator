import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";


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
        hidden: false
      },
      {
        dataField: 'FG_PCTrt',
        text: 'FG%',
        sort: true,
        hidden: false
      }, 
      {
        dataField: 'FG3Mrt',
        text: '3PTM',
        sort: true,
        hidden: false
      },
      {
        dataField: 'FT_PCTrt',
        text: 'FT%',
        sort: true,
        hidden: false
      },
      {
        dataField: 'REBrt',
        text: 'REB',
        sort: true,
        hidden: false
      },
      {
        dataField: 'ASTrt',
        text: 'AST',
        sort: true,
        hidden: false
      },
      {
        dataField: 'STLrt',
        text: 'STL',
        sort: true,
        hidden: false
      },
      {
        dataField: 'BLKrt',
        text: 'BLK',
        sort: true,
        hidden: false
      },
      {
        dataField: 'TOVrt',
        text: 'TOV',
        sort: true,
        hidden: false
      },
    ],
    columnsbase: [
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
        hidden: false
      },
      {
        dataField: 'FG_PCTrt',
        text: 'FG%',
        sort: true,
        hidden: false
      }, 
      {
        dataField: 'FG3Mrt',
        text: '3PTM',
        sort: true,
        hidden: false
      },
      {
        dataField: 'FT_PCTrt',
        text: 'FT%',
        sort: true,
        hidden: false
      },
      {
        dataField: 'REBrt',
        text: 'REB',
        sort: true,
        hidden: false
      },
      {
        dataField: 'ASTrt',
        text: 'AST',
        sort: true,
        hidden: false
      },
      {
        dataField: 'STLrt',
        text: 'STL',
        sort: true,
        hidden: false
      },
      {
        dataField: 'BLKrt',
        text: 'BLK',
        sort: true,
        hidden: false
      },
      {
        dataField: 'TOVrt',
        text: 'TOV',
        sort: true,
        hidden: false
      },
    ]
  }

  componentDidMount() {
    this.setState({
        guards: this.props.gratings? this.props.gratings: [],
        forwards: this.props.fratings? this.props.fratings: [],
        centers: this.props.cratings? this.props.cratings: [],
        all: this.props.aratings? this.props.aratings: [],
    })
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




  filterInfo(event){
      event.preventDefault();
      //let u = ["PTSrt","FG_PCTrt","FG3Mrt","FT_PCTrt","REBrt","ASTrt","STLrt","BLKrt","TOVrt"];
      let u = this.state.sfil;
      console.log(u);
      if(this.state.sfil.length){
         let tempc = [...this.state.columnsbase];
         for(let i = 0; i<u.length;i++){
            let objIndex = tempc.findIndex((obj => obj.dataField === u[i]));
            console.log(objIndex);
            if(objIndex>-1){
                tempc[objIndex].hidden = true;
            }
         }
         console.log(tempc);
         this.setState({
            columns: tempc,
         })
         console.log(this.state.columns);
      }
      /*if(this.state.av === "all"){
        u.push("avail=" + this.state.av);   
      }*/

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
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="PTSrt">PTS</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FG_PCTrt">FG%</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FG3Mrt">3PTM</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="FT_PCTrt">FT%</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="REBrt">REB</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="ASTrt">AST</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="STLrt">STL</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="BLKrt">BLK</ToggleButton>
          <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="TOVrt">TOV</ToggleButton>
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
            {this.state.all ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.state.all } 
              columns={ this.state.columns }
              pagination={ paginationFactory() }/>
              :<h5>loading or no compiled data</h5>
            }
        </div>
        <div className={this.state.pos !== "guards" ? 'hidden' : ''}>
            <h3>Guards Relative Ratings</h3>
            {this.state.guards ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.state.guards } 
              columns={ this.state.columns }
              pagination={ paginationFactory() }/>
              :<h5>loading or no compiled data</h5>
            }
        </div>
        <div className={this.state.pos !== "forwards" ? 'hidden' : ''}>
            <h3>Forwards Relative Ratings</h3>
            {this.state.forwards ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.state.forwards } 
              columns={ this.state.columns }
              pagination={ paginationFactory() }/>
              :<h5>loading or no compiled data</h5>
            }
        </div>
        <div className={this.state.pos !== "centers" ? 'hidden' : ''}>
            <h3>Centers Relative Ratings</h3>
            {this.state.centers ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.state.centers } 
              columns={ this.state.columns }
              pagination={ paginationFactory() }/>
              :<h5>loading or no compiled data</h5>
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gratings: state.comp.ratings.guards,
    fratings: state.comp.ratings.forwards,
    cratings: state.comp.ratings.centers,
    aratings: state.comp.ratings.all,
  };
};


export default connect(
  mapStateToProps
)(Ratings);