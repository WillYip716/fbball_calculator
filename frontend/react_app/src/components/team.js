import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Form,Button } from "react-bootstrap";
import axios from 'axios';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
//import {Link} from 'react-router-dom';



class Team extends Component {
    state = {
      teamName:"",  
      choiceplayers: [],
      rosterguards:[],
      rosterforwards:[],
      rostercenters:[],
      rosterutils:[],
      guards: [],
      forwards: [],
      centers: [],
      all:[],
      posbox: "",
      playerbox: "",
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
      ]
    }

    removeplayer(id){
      if(id){
          const info = {
            playerid: id,
          };
          axios.put('/removeplayer/',info)      
          .then(response => {
            axios.get('/team/' + this.props.match.params.id)
            .then(response2 => {
                this.setState({
                  guards: response.data.guards,
                  forwards: response.data.forwards,
                  centers: response.data.centers,
                  all: response.data.all,
                  rosterguards: response2.data.guards,
                  rosterforwards:response2.data.forwards,
                  rostercenters:response2.data.centers,
                  rosterutils:response2.data.utils,
                });
            });
          });
      }
    }

    
  
    componentDidMount() {
      axios.get('/team/' + this.props.match.params.id)
        .then(response1 => {
          axios.get('/pbp/1' + this.props.match.params.id)
            .then(response2 => {
                this.setState({
                    teamName: response1.data.team,
                    guards: response2.data.guards,
                    forwards: response2.data.forwards,
                    centers: response2.data.centers,
                    all: response2.data.all,
                    rosterguards: response1.data.guards,
                    rosterforwards:response1.data.forwards,
                    rostercenters:response1.data.centers,
                    rosterutils:response1.data.utils,
                });
            });
        });
    }

    changepositionbox(event) {
      if(event.target.value === "guards"){
          this.setState({
            choiceplayers: this.state.guards,
            posbox: "guard"
          })
      }
      else if(event.target.value === "forwards"){
        this.setState({
          choiceplayers: this.state.forwards,
          posbox: "forward"
        })
      }
      else if(event.target.value === "centers"){
        this.setState({
          choiceplayers: this.state.centers,
          posbox: "center"
        })
      }
      else if(event.target.value === "utility"){
        this.setState({
          choiceplayers: this.state.all,
          posbox: "util"
        })
      }
    }

    changeplayerbox(event) {
      this.setState({
          playerbox: event.target.value,
      })
    }

    checkrosterspots(){
        switch(this.state.posbox) {
          case 'guard':
            return this.state.rosterguards.length < 3;
          case 'forward':
            return this.state.rosterforwards.length < 3;
          case 'center':
            return this.state.rostercenters.length < 2;
          case 'util':
            return this.state.rosterutils.length < 5;
          default:
            return false;
        }
    }
    
    addPlayer(event) {
      event.preventDefault();
      if(this.checkrosterspots()&&(this.state.posbox)&&(this.state.playerbox)){
        const info = {
          name: this.state.playerbox,
          teamid: this.props.match.params.id,
          pos: this.state.posbox,
        };
        axios.put('/addplayer/',info)      
          .then(response => {
            axios.get('/team/' + this.props.match.params.id)
            .then(response2 => {
                this.setState({
                  guards: response.data.guards,
                  forwards: response.data.forwards,
                  centers: response.data.centers,
                  all: response.data.all,
                  posbox: "",
                  playerbox: "",
                  choiceplayers: [],
                  rosterguards: response2.data.guards,
                  rosterforwards:response2.data.forwards,
                  rostercenters:response2.data.centers,
                  rosterutils:response2.data.utils,
                });
            });
          });
      }
      else{
          console.log("error adding");
      }
    }
    
    render() {
      return (
        <div className="container">
          <h2>{this.state.teamName}</h2>
          <h4>Guards ({this.state.rosterguards.length}/3)</h4>
          <BootstrapTable 
          striped
          hover
          keyField='id' 
          data={ this.state.rosterguards } 
          columns={ this.state.columns }
          />

          <h4>Forwards ({this.state.rosterforwards.length}/3)</h4>
          <BootstrapTable 
          striped
          hover
          keyField='id' 
          data={ this.state.rosterforwards } 
          columns={ this.state.columns }
          />

          <h4>Centers ({this.state.rostercenters.length}/2)</h4>
          <BootstrapTable 
          striped
          hover
          keyField='id' 
          data={ this.state.rostercenters } 
          columns={ this.state.columns }
          />

          <h4>Utility ({this.state.rosterutils.length}/5)</h4>
          <BootstrapTable 
          striped
          hover
          keyField='id' 
          data={ this.state.rosterutils } 
          columns={ this.state.columns }
          />
          

          <Form onSubmit={this.addPlayer.bind(this)} role="form">
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Select a player to add : </Form.Label>
              <h6>Position to add</h6>
              <Form.Control as="select" custom onChange={this.changepositionbox.bind(this)}>
                <option key='blankChoice' hidden value="" />
                <option value="guards">Guard</option>
                <option value="forwards">Forwards</option>
                <option value="centers">Centers</option>
                <option value="utility">Utility</option>
              </Form.Control>
              <h6>Player to add</h6>
              <Form.Control as="select" custom onChange={this.changeplayerbox.bind(this)}>
                <option key='blankChoice2' hidden value />
                {this.state.choiceplayers ?
                    this.state.choiceplayers.map(players => (
                        <option key={players.Player_Name} value={players.Player_Name}>{players.Player_Name}</option>
                    ))
                    :<h3>nothing yet</h3>
                }
              </Form.Control>
            </Form.Group>
            <Button type="submit">Add Player</Button>
          </Form>
        </div>
      );
    }
  }
  
  export default Team;