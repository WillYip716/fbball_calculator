import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
//import axios from 'axios';
import { useSelector } from 'react-redux'

function RecPlayers(props){

    const [view, setView] = useState("");
    const focus = props.focus
    const team = props.team
    const rostered = useSelector(state => state.comp.teams)[parseInt(props.team)].players;
    const rp = useSelector(state => state.comp.ratings.all).filter((item => !rostered.includes(item.Player_Name)))
    
    //console.log(rostered)
    //console.log(rp)
    const columns = [
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

    let handleChange = (event) => {    

        setView(event.target.value)
    }
    
    const fits = rp.reduce((p, c) => {
        let ft = focus.reduce((prev, cur) => prev + c[cur+"rt"],0);
        if(ft > 15){
            p.push(c);
            return p;
        }
        return p;
    }, []);
    //console.log(fits)
    
    

    return (
      <div>
        <h3>Players to target</h3>
        <BootstrapTable 
        striped
        hover
        keyField='id' 
        data={ fits } 
        columns={ columns }/>
      </div>
      
    );

  }
  

  export default RecPlayers;
  
