import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Form,Button, Table } from "react-bootstrap";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
//import {Link} from 'react-router-dom';
import { connect } from "react-redux";



class Team extends Component {
    state = {
      teamName:"",  
      rosteredplayers:[],
      guards: [],
      forwards: [],
      centers: [],
      all:[],
      focus:[],
      pos:"avg",
      sfil:[],
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
        {
          text: '',
          dataField: '',
          formatter: (cell, row) => {
            return (    
              <div>
                <Button variant="outline-danger" key={row.Player_Name} onClick={() => this.removeplayer(row.Player_Name)}>
                    X
                </Button>
              </div>
            )
          }
        },
      ],
      ratingscolumns: [
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
      ratingscolumnsbase: [
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


    //this.props.match.params.id
  
    componentDidMount() {
      if(this.props.teams && (parseInt(this.props.match.params.id) < this.props.teams.length)){
        const name = this.props.teams[parseInt(this.props.match.params.id)].teamName;
        const players = this.props.teams[parseInt(this.props.match.params.id)].players;
        const updatedroster = this.props.aratings.filter(item => players.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)})));
        const f = this.pickHighest(this.props.avgrank.filter(item=>item.team===name)[0]);
        this.setState({
            teamName: name,
            rosteredplayers: updatedroster,
            focus:f,
        })
      }
      else{
        this.setState({
            teamName: "No team available",
        })
      }
      
    }

    componentDidUpdate(prevProps) {
      //console.log(prevProps);
      if(this.props.match.params.id !== prevProps.match.params.id){
        if(this.props.teams && (parseInt(this.props.match.params.id) < this.props.teams.length)){
          const name = this.props.teams[parseInt(this.props.match.params.id)].teamName;
          const players = this.props.teams[parseInt(this.props.match.params.id)].players;
          const roster = this.props.aratings.filter(item => players.includes(item.Player_Name));
          const f = this.pickHighest(this.props.avgrank.filter(item=>item.team===name)[0]);
          this.setState({
              teamName: name,
              rosteredplayers: roster,
              ratingscolumn: this.state.ratingscolumnsbase,
              focus: f,
          })
          if(this.state.pos === "ratings"){
            const newColumn = this.state.ratingscolumnsbase.filter(element => this.state.sfil.indexOf(element.dataField) === -1);
            const updatedroster = this.props.aratings.filter(item => players.includes(item.Player_Name)).map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)})));
            
            this.setState({
                ratingscolumns:newColumn,
                rosteredplayers: updatedroster,
            });
          }
        }
        else{
          this.setState({
              teamName: "No team available",
          })
        } 
      }
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
      const newColumn = this.state.ratingscolumnsbase.filter(element => this.state.sfil.indexOf(element.dataField) === -1);
          
      const updatedroster = this.state.rosteredplayers.map(obj=>(Object.assign(obj, { TotalRatingEdited: this.filTotal(obj)})));
      
      this.setState({
          ratingscolumns:newColumn,
          rosteredplayers: updatedroster,
      });
    }

    pickHighest = (obj) => {
      const ranks = {
        ...obj
      };
      delete ranks["FTM"];
      delete ranks["FTA"];
      delete ranks["FGM"];
      delete ranks["FGA"];
      delete ranks["rottotal"];
      delete ranks["team"];
      
      const requiredObj = [];
      let num = 5;
      if(num > Object.keys(ranks).length){
         return false;
      };
      Object.keys(ranks).sort((a, b) => ranks[a] - ranks[b]).forEach((key, ind) =>
      {
         if(ind < num){
           if(key === "FG_PCT"){
              requiredObj.push("FG%");
           }
           else if(key === "FT_PCT"){
              requiredObj.push("FT%");
           }
           else{
              requiredObj.push(key);
           }
         }
         else if(ranks[key] <= 6 ){
            requiredObj.push(key);
         }
      });
      return requiredObj;
    }

    statstog(val) {
      this.setState({
          sfil: val,
      })
    }

    ptog(val) {
      this.setState({
          pos: val,
      })
    }
    
    render() {
      return (
        <div className="container">
          <h2>{this.state.teamName}</h2>

          <ToggleButtonGroup type="radio" name="options" defaultValue="avg" onChange={this.ptog.bind(this)}>
            <ToggleButton value="avg" style={{padding: "5px",border: "black 1px solid"}}>Averages</ToggleButton>
            <ToggleButton value="ratings" style={{padding: "5px", border: "black 1px solid"}}>Ratings</ToggleButton>
          </ToggleButtonGroup>
          <br/>
            <div className={this.state.pos !== "ratings" ? 'hidden' : ''}>
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
              <Form onSubmit={this.filterInfo.bind(this)} role="form">
                <Button type="submit">Filter</Button>
              </Form>
            </div>
          <br/>
          <Table>
            <thead>
              <tr>
                <th>Suggested Stats to Focus on</th>
                {this.state.focus.map((item,index) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
          </Table>


          <div className={this.state.pos !== "avg" ? 'hidden' : ''}>
            <h3>Averages</h3>
            {this.state.rosteredplayers ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.state.rosteredplayers } 
              columns={ this.state.columns }/>
              :<h5>loading or no compiled data</h5>
            }
          </div>

          <div className={this.state.pos !== "ratings" ? 'hidden' : ''}>
            <h3>Ratings</h3>
            {this.state.rosteredplayers ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.state.rosteredplayers } 
              columns={ this.state.ratingscolumns }/>
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
      teams: state.comp.teams,
      avg: state.comp.rankings.avg,
      tot: state.comp.rankings.tot,
      avgrank: state.comp.rankings.rankavg,
      totrank: state.comp.rankings.ranktot,
      rkstd: state.comp.rankings.rkstd,
    };
  };
  
  
  export default connect(
    mapStateToProps
  )(Team);