import React, { useState, useEffect } from 'react';
import axios from 'axios';
 

function Home() {
  const [data, setData] = useState([]);
 

  /*useEffect(()=>{
      async function fetchdata(){
          axios.get('/predict/10')
          .then(res => {
              const games = res.data;
              setData(games);
          })
      }
      fetchdata();
  },[])*/
 
  return (
    <ul style={{textAlign:"center"}}>
      <h2>Latest Predictions</h2>
      {data.map(item => (
        <div key={item.index}>
            <h4>{item.vteam} at {item.hteam}</h4>
            <p>{item.visitor_pred} to {item.home_pred}</p>
        </div>
      ))}
    </ul>
  );
}
 
export default Home;