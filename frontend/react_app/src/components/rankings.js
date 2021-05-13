import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { connect } from "react-redux";

class Rankings extends Component {
  state = {
    toggle: "average",
    rankcolumns: [
      {
        dataField: 'team',
        text: 'Team Name',
        sort: true
      },
      {
        dataField: 'PTS',
        text: 'PTS RNK',
        sort: true
      },
      {
        dataField: 'FG_PCT',
        text: 'FG% RNK',
        sort: true
      },
      {
        dataField: 'FT_PCT',
        text: 'FT% RNK',
        sort: true
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM RNK',
        sort: true
      },
      {
        dataField: 'REB',
        text: 'REB RNK',
        sort: true
      },
      {
        dataField: 'AST',
        text: 'AST RNK',
        sort: true
      },
      {
        dataField: 'STL',
        text: 'STL RNK',
        sort: true
      },
      {
        dataField: 'BLK',
        text: 'BLK RNK',
        sort: true
      },
      {
        dataField: 'TOV',
        text: 'TOV RNK',
        sort: true
      },
      {
        dataField: 'rottotal',
        text: 'ROT Score',
        sort: true
      },
    ],
    columns: [
      {
        dataField: 'team',
        text: 'Team Name',
        sort: true
      },
      {
        dataField: 'PTS',
        text: 'PTS',
        sort: true
      },
      {
        dataField: 'FG_PCT',
        text: 'FG%',
        sort: true
      },
      {
        dataField: 'FT_PCT',
        text: 'FT%',
        sort: true
      }, 
      {
        dataField: 'FG3M',
        text: '3PTM',
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

  changetog(val) {
    this.setState({
        toggle: val,
    })
  }
  
  render() {

    return (
      <div className="container">
        <h1>Rankings</h1>

        <ToggleButtonGroup type="radio" name="options" defaultValue="average" onChange={this.changetog.bind(this)}>
          <ToggleButton value="average" style={{padding: "5px",border: "black 1px solid"}}>Team Average</ToggleButton>
          <ToggleButton value="total" style={{padding: "5px", border: "black 1px solid"}}>Team Remaining Total</ToggleButton>
          <ToggleButton value="avgrank" style={{padding: "5px", border: "black 1px solid"}}>Team Average Rank</ToggleButton>
          <ToggleButton value="totrank" style={{padding: "5px", border: "black 1px solid"}}>Team Total Rank</ToggleButton>
        </ToggleButtonGroup>
        <div className={this.state.toggle !== "average" ? 'hidden' : ''}>
            <h3>Team Average Stats </h3>
            {this.props.avg ?
                <BootstrapTable 
                striped
                hover
                keyField='id' 
                data={ this.props.avg } 
                columns={ this.state.columns }/>
                :<h3>nothing yet</h3>
            }   
        </div>
        <div className={this.state.toggle !== "total" ? 'hidden' : ''}>
            <h3>Totals Future Stats</h3>
            {this.props.tot ?
                <BootstrapTable 
                striped
                hover
                keyField='id' 
                data={ this.props.tot } 
                columns={ this.state.columns }/>
                :<h3>nothing yet</h3>
            }   
        </div>
        <div className={this.state.toggle !== "avgrank" ? 'hidden' : ''}>
            <h3>Average Stats Rankings</h3>
            {this.props.avgrank ?
                <BootstrapTable 
                striped
                hover
                keyField='id' 
                data={ this.props.avgrank } 
                columns={ this.state.rankcolumns }/>
                :<h3>nothing yet</h3>
            }
        </div>
        <div className={this.state.toggle !== "totrank" ? 'hidden' : ''}>
            <h3>Total Stats Rankings</h3>
            {this.props.totrank ?
                <BootstrapTable 
                striped
                hover
                keyField='id' 
                data={ this.props.totrank } 
                columns={ this.state.rankcolumns }/>
                :<h3>nothing yet</h3>
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avg: state.comp.rankings.avg,
    tot: state.comp.rankings.tot,
    avgrank: state.comp.rankings.rankavg,
    totrank: state.comp.rankings.ranktot,
  };
};


export default connect(
  mapStateToProps
)(Rankings);