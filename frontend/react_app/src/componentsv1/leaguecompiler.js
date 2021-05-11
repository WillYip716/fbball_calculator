import React, { Component } from 'react';
import { Form,Button } from "react-bootstrap";
import axios from 'axios';


class LeagueCompiler extends Component {
    state = {
      textarea: "",
    }

    handleChange = (event) => {    
        this.setState({
            textarea: event.target.value,
        });
    }
    
    handleSubmit = (event) => {  
        event.preventDefault(); 
        let arr = [];
        let outarr = [];
        let reTeam =  new RegExp("([a-zA-Z .'0-9]*)(?=\\nPos)","g");
        let rePlayers = new RegExp("(?<=\\n)([a-zA-Z .']*)(?=[ ](Atl|Bkn|Bos|Cha|Chi|Cle|Dal|Den|Det|GS|Hou|Ind|LAC|LAL|Mem|Mia|Mil|Min|NO|NY|OKC|Orl|Phi|Pho|Por|SA|Sac|Tor|Uta|Was))","g");
        arr = this.state.textarea.split("\n\n");
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
        axios.post('/compile',info)      
        .then(response => {
            console.log(response.data);
            this.setState({
                textarea: "",
            });
        });
        //console.log(outarr)
    }

    
    
    render() {
      return (
        <div className="container">
            <Form onSubmit={this.handleSubmit} style={{textAlign:"center", margin:"auto"}}role="form">
                <textarea style={{width: "80%",margin:"auto", height: "500px"}} value={this.state.textarea} onChange={this.handleChange} />
                <br/>
                <Button type="submit">Compile</Button>
            </Form>
        </div>
        
      );
    }
  }
  
  export default LeagueCompiler;