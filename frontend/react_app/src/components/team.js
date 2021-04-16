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
      team: [],
      guards: [],
      forwards: [],
      centers: [],
      all: [],
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
    }

    changeplayerbox(event) {
      console.log(event.target.value);
    }
    
    addPlayer(event) {
      event.preventDefault();
      /*axios.post(`${settings.API_SERVER}/api/auth/login/`, {
          username: username,
          password: password
      })*/
      
      console.log("values are : " + this.state.posbox + " " + this.state.playerbox);
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

          <Form onSubmit={this.addPlayer.bind(this)} role="form">
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Select a player to add : </Form.Label>
              <Form.Control as="select" custom onChange={this.changepositionbox.bind(this)}>
                <option value="guards">Guard</option>
                <option value="forwards">Forwards</option>
                <option value="centers">Centers</option>
              </Form.Control>
              <Form.Control as="select" custom onChange={this.changeplayerbox.bind(this)}>
              {this.state.choiceplayers ?
                  this.state.choiceplayers.map(players => (
                      <option key={players.Player_Name}>{players.Player_Name}</option>
                  ))
                  :<h3>nothing yet</h3>
              }
              </Form.Control>
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        </div>
      );
    }
  }
  
  export default Team;