import React, { Component } from 'react';
//import axios from 'axios';
import { Form,Button } from "react-bootstrap";
import { connect } from "react-redux";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

class Trade extends Component {
  state = {
    lista:[],
    choicea:[],
    ateam:"",
    abox:"",
    bbox:"",
    listb:[],
    choiceb:[],
    up:{},
    traded:false,
    colorcode:{},
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
    ],
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

    this.setState({
      choicea:added,
      lista:updatedlist,
      ateam: team[0]["teamName"],
      abox:"",
      traded:false,
    })

    if(!this.state.listb.length){
      const addedb = this.state.choiceb.concat(team[0]["players"]);
      const updatedlistb = this.props.aratings.filter(item => !addedb.includes(item.Player_Name)).sort((a,b) => (a.Player_Name < b.Player_Name) ? -1 : ((b.Player_Name < a.Player_Name) ? 1 : 0));
      this.setState({
        listb:updatedlistb,
      })
    }
    
  }

  addlistb(event){
    event.preventDefault();
    const added = this.state.choiceb.concat(this.state.bbox);
    const updatedlist = this.state.listb.filter(item => !added.includes(item.Player_Name)).sort((a,b) => (a.Player_Name < b.Player_Name) ? -1 : ((b.Player_Name < a.Player_Name) ? 1 : 0));


    this.setState({
      choiceb:added,
      listb:updatedlist,
      bbox:"",
      traded:false,
    })
  }

  changelista(event){
    this.setState({
      abox: event.target.value,
    })
  }

  changelistb(event){
    this.setState({
      bbox: event.target.value,
    })
  }
  
  tradeClick(){
    
    //["PTS","FG_PCT","FG3M","FT_PCT","REB","AST","STL","BLK","TOV"]
    const tradeaway = this.props.aratings.filter(item => this.state.choicea.includes(item.Player_Name)).reduce(function(p, c) {
      return {
        PTS:  Math.round((p.PTS + c.PTS)*100)/100,
        FGM:  Math.round((p.FGM + c.FGM)*100)/100,
        FGA:  Math.round((p.FGA + c.FGA)*100)/100,
        FG3M: Math.round((p.FG3M + c.FG3M)*100)/100,
        FTM:  Math.round((p.FTM + c.FTM)*100)/100,
        FTA:  Math.round((p.FTA + c.FTA)*100)/100,
        REB:  Math.round((p.REB + c.REB)*100)/100,
        AST:  Math.round((p.AST + c.AST)*100)/100,
        STL:  Math.round((p.STL + c.STL)*100)/100,
        BLK:  Math.round((p.BLK + c.BLK)*100)/100,
        TOV:  Math.round((p.TOV + c.TOV)*100)/100,
      }},{PTS:0,FGM:0,FGA:0,FG3M:0,FTM:0,FTA:0,REB:0,AST:0,STL:0,BLK:0,TOV:0});


    const tradefor = this.props.aratings.filter(item => this.state.choiceb.includes(item.Player_Name)).reduce(function(p, c) {
      return {
        PTS:  Math.round((p.PTS + c.PTS)*100)/100,
        FGM:  Math.round((p.FGM + c.FGM)*100)/100,
        FGA:  Math.round((p.FGA + c.FGA)*100)/100,
        FG3M: Math.round((p.FG3M + c.FG3M)*100)/100,
        FTM:  Math.round((p.FTM + c.FTM)*100)/100,
        FTA:  Math.round((p.FTA + c.FTA)*100)/100,
        REB:  Math.round((p.REB + c.REB)*100)/100,
        AST:  Math.round((p.AST + c.AST)*100)/100,
        STL:  Math.round((p.STL + c.STL)*100)/100,
        BLK:  Math.round((p.BLK + c.BLK)*100)/100,
        TOV:  Math.round((p.TOV + c.TOV)*100)/100,
      }},{PTS:0,FGM:0,FGA:0,FG3M:0,FTM:0,FTA:0,REB:0,AST:0,STL:0,BLK:0,TOV:0});
    

    const tot = Object.keys(tradefor).reduce((p, c) => {
        p[c] = Math.round((tradefor[c] - tradeaway[c])*100)/100;
        return p;
    }, {});


    const teamavg = this.props.avg.filter(item => item.team === this.state.ateam)[0];

    const updatedavg = Object.keys(tot).reduce((p, c) => {
      p[c] = Math.round((parseFloat(teamavg[c]) + tot[c])*100)/100;
      return p;
    }, {});

    updatedavg.FG_PCT = Math.round((updatedavg.FGM/updatedavg.FGA)*1000)/1000;
    updatedavg.FT_PCT = Math.round((updatedavg.FTM/updatedavg.FTA)*1000)/1000;
    const netrank = Object.keys(tot).reduce((p,c) => {
        p[c] = Math.round((tot[c]/this.props.rkstd[c])*10);
        return p;
    },{});
    netrank.FG_PCT = Math.round((((teamavg.FGM + tot.FGM)/(teamavg.FGA + tot.FGA) - parseFloat(teamavg.FG_PCT))/this.props.rkstd.FG_PCT)*10)
    netrank.FT_PCT = Math.round((((teamavg.FTM + tot.FTM)/(teamavg.FTA + tot.FTA) - parseFloat(teamavg.FT_PCT))/this.props.rkstd.FT_PCT)*10)
    netrank.TOV = netrank.TOV * -1

    const colorcoded = Object.keys(netrank).reduce((p, c) => {
      if(netrank[c] <= -20){
        p[c] = "darkred"
      }
      else if(-20 <= netrank[c] && netrank[c] < -10){
        p[c] = "red"
      } 
      else if(-10 <= netrank[c] && netrank[c] < 0){
        p[c] = "tomato"
      }
      else if(0 <= netrank[c] && netrank[c] < 10){
        p[c] = "lime"
      } 
      else if(10 <= netrank[c] && netrank[c] < 20){
        p[c] = "olive"
      }
      else if(20 <= netrank[c]){
        p[c] = "darkgreen"
      }
      return p;
    }, {});
    

    this.setState({
      up: updatedavg,
      traded:true,
      colorcode:colorcoded,
    })

  }

  tradetable(){
    if(this.state.up){
      const teamavg = this.props.avg.filter(item => item.team === this.state.ateam)[0];
      return(
        <div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>Color Code</th>
                <th style={{color:"darkred"}}>Greater than 2 Rank Decrease</th>
                <th style={{color:"red"}}>Around 1 Rank Decrease</th>
                <th style={{color:"tomato"}}>Slight Decrease</th>
                <th style={{color:"lime"}}>Slight Increase</th>
                <th style={{color:"olive"}}>Around 1 Rank Increase</th>
                <th style={{color:"darkgreen"}}>Greater than 2 Rank Increase</th>
              </tr>
            </thead>
          </table>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>{this.state.ateam}</th>
                <th>PTS</th>
                <th>FGM</th>
                <th>FGA</th>
                <th>FG%</th>
                <th>3PTM</th>
                <th>FTM</th>
                <th>FTA</th>
                <th>FT%</th>
                <th>REB</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>TOV</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Before</td>
                <td>{teamavg.PTS}</td>
                <td>{teamavg.FGM}</td>
                <td>{teamavg.FGA}</td>
                <td>{teamavg.FG_PCT}</td>
                <td>{teamavg.FG3M}</td>
                <td>{teamavg.FTM}</td>
                <td>{teamavg.FTA}</td>
                <td>{teamavg.FT_PCT}</td>
                <td>{teamavg.REB}</td>
                <td>{teamavg.AST}</td>
                <td>{teamavg.STL}</td>
                <td>{teamavg.BLK}</td>
                <td>{teamavg.TOV}</td>
              </tr>
              <tr>
                <td>After</td>
                <td style={{color: this.state.colorcode.PTS}}>{this.state.up.PTS}</td>
                <td >{this.state.up.FGM}</td>
                <td >{this.state.up.FGA}</td>
                <td style={{color: this.state.colorcode.FG_PCT}}>{this.state.up.FG_PCT}</td>
                <td style={{color: this.state.colorcode.FG3M}}>{this.state.up.FG3M}</td>
                <td >{this.state.up.FTM}</td>
                <td >{this.state.up.FTA}</td>
                <td style={{color: this.state.colorcode.FT_PCT}}>{this.state.up.FT_PCT}</td>
                <td style={{color: this.state.colorcode.REB}}>{this.state.up.REB}</td>
                <td style={{color: this.state.colorcode.AST}}>{this.state.up.AST}</td>
                <td style={{color: this.state.colorcode.STL}}>{this.state.up.STL}</td>
                <td style={{color: this.state.colorcode.BLK}}>{this.state.up.BLK}</td>
                <td style={{color: this.state.colorcode.TOV}}>{this.state.up.TOV}</td>
              </tr>
            </tbody>
          </table> 
        </div>
        
      )
    }
    else{
      return(<div>Not enough data</div>)
    }

  }

  resetClick(){
    const r = this.props.teams.reduce((a, c) => a.concat(c["players"]),[])    
    const rostered = this.props.aratings.filter(item => r.includes(item.Player_Name)).sort((a,b) => (a.Player_Name < b.Player_Name) ? -1 : ((b.Player_Name < a.Player_Name) ? 1 : 0))
    this.setState({
      lista:rostered,
      choicea:[],
      ateam:"",
      abox:"",
      bbox:"",
      listb:[],
      choiceb:[],
      up:{},
      traded:false,
      colorcode:{},
    })
  }



  render() {

    return (
      <div className="container">
        <div style={{display:"flex",marginBottom:"2rem"}}>
        {this.state.choicea.length && this.state.choiceb.length && !this.state.traded?
          <button className="btn btn-primary" style={{margin:"auto",fontSize:"2rem"}} onClick={() => this.tradeClick()}>Trade</button>
          :<h1 style={{margin:"auto"}}>Trade</h1>
        }
        {this.state.choicea.length || this.state.choiceb.length?
          <button className="btn btn-primary" style={{margin:"auto",fontSize:"2rem"}} onClick={() => this.resetClick()}>Reset</button>
          :<div/>
        }
        </div>
        
        {this.state.traded?
          this.tradetable()
          :<div></div>
        }


        {this.state.choicea.length?
            <div>
              <h6 >Trading away: <strong style={{color:"red"}}>{[...this.state.choicea].join(",")}</strong></h6>
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.props.aratings.filter(item => this.state.choicea.includes(item.Player_Name)) } 
              columns={ this.state.columns }/>
            </div>
            :<div/>
        }

        {this.state.choiceb.length?
            <div>
              <h6 >Trading For: <strong style={{color:"green"}}>{[...this.state.choiceb].join(",")}</strong></h6>
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ this.props.aratings.filter(item => this.state.choiceb.includes(item.Player_Name)) } 
              columns={ this.state.columns }/>
            </div>
            :<div/>
        }

        <div className="tradeform">
            <Form onSubmit={this.addlista.bind(this)} role="form">
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Step 1: Select a rostered player</Form.Label>
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
        <div className="tradeform"> 
            <Form onSubmit={this.addlistb.bind(this)} role="form">
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Step 2: Select a player to trade for</Form.Label>
                  <Form.Control as="select" custom onChange={this.changelistb.bind(this)}>
                    <option key='blankChoice' hidden value="" />
                    {this.state.listb ?
                        this.state.listb.map(players => (
                            <option key={players.Player_Name} value={players.Player_Name}>{players.Player_Name}</option>
                        ))
                        :<h3>no valid players loaded</h3>
                    }
                  </Form.Control>
                </Form.Group>
                <Button type="submit">Add Player</Button>
            </Form>
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
)(Trade);