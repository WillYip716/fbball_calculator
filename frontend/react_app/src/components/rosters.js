import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';




function Roster() {
  const [data, setData] = useState([]);

  useEffect(()=>{
      async function fetchdata(){
          
          axios.get('/teams/')
          .then(res => {
              const rosters = res.data;
              setData(rosters);
          })
      }
      fetchdata();
  },[])
 
  return (
    <div style={{textAlign:"center", maxWidth: "1000px",margin:"auto"}}>
      {data.map(item => (
        <Link to={`/team/${item.teamid}`} key={item.team}>
          <Card key={item.index} >
              <h4>{item.team}</h4>
              <ul>
                {item.players.map(players => (
                    <li key={players}>{players}</li>
                ))}
              </ul>
          </Card>
        </Link>
      ))}
    </div>
  );
}
 
export default Roster;