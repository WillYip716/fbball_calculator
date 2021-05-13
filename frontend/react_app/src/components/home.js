import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
//import axios from 'axios';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from "react-redux";

class Home extends Component {
  state = {
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

  /*componentDidMount() {
    axios.get('/allplayers')
      .then(response => {
        console.log(response)
        this.setState({
          players: response.data.a,
        });
      });
  }*/
  
  render() {
    return (
      <div className="container">
        <h1>All Players</h1>
        {this.props.players ?
            <BootstrapTable 
            striped
            hover
            keyField='id' 
            data={ this.props.players } 
            columns={ this.state.columns }
            pagination={ paginationFactory() }
            />
          :<h3>nothing yet</h3>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    players: state.comp.ratings.all
  };
};


export default connect(
  mapStateToProps
)(Home);