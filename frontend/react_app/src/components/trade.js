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
    bbox:"",
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

    this.setState({
      choicea:added,
      lista:updatedlist,
      ateam: team[0]["teamName"],
      abox:"",
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
    console.log("clicked");
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
    
    console.log(tradeaway);
    console.log(tradefor);

    const tot = Object.keys(tradefor).reduce((p, c) => {
        p[c] = Math.round((tradefor[c] - tradeaway[c])*100)/100;
        return p;
    }, {});

    console.log(tot);

    const teamavg = this.props.avg.filter(item => item.team === this.state.ateam)[0];

    console.log(teamavg);
    const updatedavg = Object.keys(tot).reduce((p, c) => {
      p[c] = Math.round((parseFloat(p[c]) + tot[c])*100)/100;
      return p;
    }, {...teamavg});

    updatedavg.FG_PCT = Math.round((updatedavg.FGM/updatedavg.FGA)*1000)/1000;
    updatedavg.FT_PCT = Math.round((updatedavg.FTM/updatedavg.FTA)*1000)/1000;
    console.log(updatedavg);
    const netrank = Object.keys(tot).reduce((p,c) => {
        p[c] = Math.round((tot[c]/this.props.rkstd[c])*10);
        return p;
    },{});
    netrank.FG_PCT = Math.round((((teamavg.FGM + tot.FGM)/(teamavg.FGA + tot.FGA) - parseFloat(teamavg.FG_PCT))/this.props.rkstd.FG_PCT)*10)
    netrank.FT_PCT = Math.round((((teamavg.FTM + tot.FTM)/(teamavg.FTA + tot.FTA) - parseFloat(teamavg.FT_PCT))/this.props.rkstd.FT_PCT)*10)
    netrank.TOV = netrank.TOV * -1
    console.log(netrank);
    
  }

  render() {
    return (
      <div className="container">
        <div style={{display:"flex",marginBottom:"2rem"}}>
        {this.state.choicea.length && this.state.choiceb.length?
          <button className="btn btn-primary" style={{margin:"auto",fontSize:"2rem"}} onClick={() => this.tradeClick()}>Trade</button>
          :<h1 style={{margin:"auto"}}>Trade</h1>
        }
        </div>
        
        
        
        
        
        <div className="tradeform">
            <h6 style={{color:"red"}}>{[...this.state.choicea].join(",")}</h6>
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
            <h6 style={{color:"green"}}>{[...this.state.choiceb].join(",")}</h6>
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