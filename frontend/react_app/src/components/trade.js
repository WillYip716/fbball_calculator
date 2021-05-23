import React, { Component } from 'react';
//import axios from 'axios';
import { Form,Button } from "react-bootstrap";
import { connect } from "react-redux";

class Trade extends Component {
  state = {
    lista:[],
    choicea:[],
    ateam:"",
    abox:"",
    listb:[],
    choiceb:[],
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
    ]
  }

  componentDidMount() {
    if(this.props.teams&&this.props.aratings){
      const r = this.props.teams.reduce((a, c) => a.concat(c["players"]),[])    
      const rostered = this.props.aratings.filter(item => r.includes(item.Player_Name)).sort((a,b) => (a.Player_Name < b.Player_Name) ? -1 : ((b.Player_Name < a.Player_Name) ? 1 : 0));
      this.setState({
        lista:rostered,
      })
    }
  }

  addlista(event){
    event.preventDefault();
    const team = this.props.teams.filter(item => item["players"].includes(this.state.abox));
    const added = this.state.choicea.concat(this.state.abox);
    const filterlist = team[0]["players"].filter(item => !added.includes(item));
    const updatedlist = this.props.aratings.filter(item => filterlist.includes(item.Player_Name)).sort((a,b) => (a.Player_Name < b.Player_Name) ? -1 : ((b.Player_Name < a.Player_Name) ? 1 : 0));

    const choiceb = this.props.aratings.filter(item => !team[0]["players"].includes(item.Player_Name)).sort((a,b) => (a.Player_Name < b.Player_Name) ? -1 : ((b.Player_Name < a.Player_Name) ? 1 : 0));

    console.log(choiceb);

    this.setState({
      choicea:added,
      lista:updatedlist,
      ateam: team,
      abox:"",
      listb:choiceb,
    })
  }

  changelista(event){
    this.setState({
      abox: event.target.value,
    })
  }

  changelistb(){

  }
  
  render() {
    return (
      <div className="container">
        <h1>Trade</h1>
        <h5>Players to trade away</h5>
        <h6 style={{color:"red"}}>{[...this.state.choicea].join(",")}</h6>
        <Form onSubmit={this.addlista.bind(this)} role="form">
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Select a player </Form.Label>
              <Form.Control as="select" custom onChange={this.changelista.bind(this)}>
                <option key='blankChoice' hidden value="" />
                {this.state.lista ?
                    this.state.lista.map(players => (
                        <option key={players.Player_Name} value={players.Player_Name}>{players.Player_Name}</option>
                    ))
                    :<h3>no valid players loaded</h3>
                }
              </Form.Control>
            </Form.Group>
            <Button type="submit">Add Player</Button>
        </Form>
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
)(Trade);