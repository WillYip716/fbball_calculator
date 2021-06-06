import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";


class Home extends Component {
  state = {
    guards: [],
    forwards: [],
    centers: [],
    all: [],
    av: "all",
    tar:"",
    sfil:[],
    pos: "all",
    columnsavg: [
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
    ],
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
        dataField: 'TotalRatingEdited',
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
        dataField: 'TotalRatingEdited',
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
    if(this.props.aratings){
      const updatedg = this.props.gratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedf = this.props.fratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updatedc = this.props.cratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      const updateda = this.props.aratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
      this.setState({
          guards: updatedg,
          forwards: updatedf,
          centers: updatedc,
          all: updateda,
      })
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.aratings !== this.props.aratings){
      if(this.props.aratings.length){
        const updatedg = this.props.gratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updatedf = this.props.fratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updatedc = this.props.cratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        const updateda = this.props.aratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
        this.setState({
            guards: updatedg,
            forwards: updatedf,
            centers: updatedc,
            all: updateda,
        })
      }
    }
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

  togglear(val) {
    this.setState({
        tar: val,
    })
  }


  filTotal = (o) => {    
    let total = 0;
    let filtot = 0;
    let u = ["PTSrt","FG_PCTrt","FG3Mrt","FT_PCTrt","REBrt","ASTrt","STLrt","BLKrt","TOVrt"];
    for(let j=0;j<u.length;j++){
      total += o[u[j]];
    }
    if(this.state.sfil.length){
      const keys = this.state.sfil;
      for(let i=0;i<keys.length;i++){
        filtot += o[keys[i]];
      }
    }
    return Math.round((total - filtot)* 100)/100;
  }


  filterInfo(event){
      event.preventDefault();
      //let u = ["PTSrt","FG_PCTrt","FG3Mrt","FT_PCTrt","REBrt","ASTrt","STLrt","BLKrt","TOVrt"];
      const newColumn = this.state.columnsbase.filter(element => this.state.sfil.indexOf(element.dataField) === -1);
      if(this.state.av === "available"){
          const rostered = this.props.teams.reduce((a, c) => a.concat(c["players"]),[])
          
          const updatedg = this.props.gratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedf = this.props.fratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedc = this.props.cratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updateda = this.props.aratings.slice().filter(item => !rostered.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          
          this.setState({
              columns:newColumn,
              guards: updatedg,
              forwards: updatedf,
              centers: updatedc,
              all: updateda,
          });
      }else{
          const updatedg = this.props.gratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedf = this.props.fratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updatedc = this.props.cratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));
          const updateda = this.props.aratings.slice().map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)}))).sort((a,b) => (a.TotalRatingEdited > b.TotalRatingEdited) ? -1 : ((b.TotalRatingEdited > a.TotalRatingEdited) ? 1 : 0));

          this.setState({
            columns:newColumn,
            guards: updatedg,
            forwards: updatedf,
            centers: updatedc,
            all: updateda,
          });
      }

  }
  
  render() {

    return (
      
      <div className="container">
        {this.state.all.length?
          <ToggleButtonGroup type="radio" name="options" defaultValue="" onChange={this.togglear.bind(this)}>
            <ToggleButton value={this.state.tar?"":"ratings"} style={{padding: "5px",border: "black 1px solid"}}>{this.state.tar?"Toggle: Ratings":"Toggle: Avg"}</ToggleButton>
          </ToggleButtonGroup>
          :<h5>No compiled data or loading...</h5>
        }
        

        {this.state.tar !== "ratings" &&  this.state.all.length ?
          <div>
            <h1>All Players</h1>
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.state.all } 
            columns={ this.state.columnsavg }
            pagination={ paginationFactory() }
            />
          </div> 
          :<div/>
        }

        {this.state.tar === "ratings" && this.state.all.length?
          <div>
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
            <ToggleButtonGroup type="radio" name="availoptions" onChange={this.avtog.bind(this)} defaultValue="all">
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="all">All</ToggleButton>
              <ToggleButton style={{padding: "5px",border: "black 1px solid"}} value="available">Available</ToggleButton>
            </ToggleButtonGroup>
            <Form onSubmit={this.filterInfo.bind(this)} role="form">
              <Button style={{backgroundColor: "gray",border: "black 1px solid"}} type="submit">Filter</Button>
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
          :<div/>
        }
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
    teams: state.comp.teams,
  };
};


export default connect(
  mapStateToProps
)(Home);