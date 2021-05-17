import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";




function Roster() {
  const teams = useSelector(state => state.comp.teams)

 
  return (
    <div style={{textAlign:"center", maxWidth: "1000px",margin:"auto"}}>
      {teams ?
        teams.map((item,index) => (
          <Link to={`/team/${index}`} key={item.teamName}>
            <Card key={index} >
                <h4>{item.teamName}</h4>
                <ul>
                  {item.players.map(players => (
                      <li key={players}>{players}</li>
                  ))}
                </ul>
            </Card>
          </Link>
        ))
        :<div>no teams compiled</div>
      }
    </div>
      
  );
}
 
export default Roster;