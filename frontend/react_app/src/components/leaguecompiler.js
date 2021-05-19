import React, { useState } from 'react';
import { Form,Button } from "react-bootstrap";
//import axios from 'axios';
import { compile } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

function LeagueCompiler(){

    const [textarea, setText] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();

    let handleChange = (event) => {    

        setText(event.target.value)
    }
    
    let handleSubmit = (event) => {  
        event.preventDefault(); 
        let arr = [];
        let outarr = [];
        let reTeam =  new RegExp("([a-zA-Z .'0-9-]*)(?=\\nPos)","g");
        let rePlayers = new RegExp("(?<=\\n)([a-zA-Z .'-]*)(?=[ ](Atl|Bkn|Bos|Cha|Chi|Cle|Dal|Den|Det|GS|Hou|Ind|LAC|LAL|Mem|Mia|Mil|Min|NO|NY|OKC|Orl|Phi|Pho|Por|SA|Sac|Tor|Uta|Was))","g");
        arr = textarea.split("\n\n");
        arr = arr.filter((i) => (i.indexOf("Pos")>-1));
        for(let i = 0; i < arr.length; i++){
            outarr.push({
                'teamName': arr[i].match(reTeam)[0],
                'players': arr[i].match(rePlayers)
            });
        }
        const info = {
            teams: outarr
        };
        console.log("compile button pressed");
        
        dispatch(compile(info));
        history.push("/");
        //console.log(outarr)
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Compile Yahoo League</Popover.Title>
          <Popover.Content>
            Head over to the rosters page under the "league" drop down in your league. Simply copy all the content (ctrl + a => ctrl + c) and paste into the box below
          </Popover.Content>
        </Popover>
    );

    
    

    return (
      <div className="container">
        <div style={{display:"flex"}}>
            <h3 style={{display:"inline-block",marginRight:"auto"}}>Compile League</h3>
            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                <Button className="info">&#9432;</Button>
            </OverlayTrigger>
        </div>
        

          <Form onSubmit={handleSubmit} style={{textAlign:"center", margin:"auto"}}role="form">
              <textarea style={{width: "100%",margin:"auto", height: "500px"}} value={textarea} onChange={handleChange} />
              <br/>
              <Button type="submit">Compile</Button>
          </Form>
      </div>
      
    );

  }
  

  export default LeagueCompiler;
  

  /*export default connect(
    null,
    { compile }
  )(LeagueCompiler);*/