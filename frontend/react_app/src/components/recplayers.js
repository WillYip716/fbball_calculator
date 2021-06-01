import React, { useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { useSelector } from 'react-redux'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import paginationFactory from 'react-bootstrap-table2-paginator';


function RecPlayers(props){
    

    const [view, setView] = useState("hide");
    const focus = props.focus
    const rostered = useSelector(state => state.comp.teams)[parseInt(props.team)].players;
    const rp = useSelector(state => state.comp.ratings.all).filter((item => !rostered.includes(item.Player_Name)))
    const fpres = focus.map((cat) => {
      switch(cat) {
        case 'FG_PCT':
          return 'FG%';
        case 'FT_PCT':
          return 'FT%';
        case 'FG3M':
          return '3PTM';
        default:
          return cat;
      }
    })
    //console.log(fpres)
    //console.log(rp)
    const columns = [
        {
          dataField: 'Player_Name',
          text: 'Name',
          sort: true,
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
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("PTS")?"bold":"normal") ,color: (focus.includes("PTS")?(aob(row.PTSrt,"PTS")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        },
        {
          dataField: 'FGM',
          text: 'FGM',
          sort: true,
        },
        {
          dataField: 'FGA',
          text: 'FGA',
          sort: true
        },
        {
          dataField: 'FG_PCT',
          text: 'FG%',
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("FG_PCT")?"bold":"normal") ,color: (focus.includes("FG_PCT")?(aob(row.FG_PCTrt,"FG_PCT")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        }, 
        {
          dataField: 'FG3M',
          text: '3PTM',
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("FG3M")?"bold":"normal"),color: (focus.includes("FG3M")?(aob(row.FG3Mrt,"FG3M")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
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
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("FT_PCT")?"bold":"normal"),color: (focus.includes("FT_PCT")?(aob(row.FT_PCTrt,"FT_PCT")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        },
        {
          dataField: 'REB',
          text: 'REB',
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("REB")?"bold":"normal"),color: (focus.includes("REB")?(aob(row.REBrt,"REB")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        },
        {
          dataField: 'AST',
          text: 'AST',
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("AST")?"bold":"normal"),color: (focus.includes("AST")?(aob(row.ASTrt,"AST")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        },
        {
          dataField: 'STL',
          text: 'STL',
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("STL")?"bold":"normal"),color: (focus.includes("STL")?(aob(row.STLrt,"STL")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        },
        {
          dataField: 'BLK',
          text: 'BLK',
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("BLK")?"bold":"normal"),color: (focus.includes("BLK")?(aob(row.BLKrt,"BLK")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        },
        {
          dataField: 'TOV',
          text: 'TOV',
          sort: true,
          formatter: (cell, row) => {
            return (    
              <div>
                <span key={row.Player_Name} style={{fontWeight:(focus.includes("TOV")?"bold":"normal"),color: (focus.includes("TOV")?(aob(row.TOVrt,"TOV")):"black")}}>
                    {cell}
                </span>
              </div>
            )
          }
        },
    ]
    const rtcolumns = [
      {
        dataField: 'Player_Name',
        text: 'Name',
        sort: true,
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
        dataField: 'PTSrt',
        text: 'PTS',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("PTS")?"bold":"normal") ,color: (focus.includes("PTS")?(aob(cell,"PTS")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
      {
        dataField: 'FG_PCTrt',
        text: 'FG%',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("FG_PCT")?"bold":"normal") ,color: (focus.includes("FG_PCT")?(aob(cell,"FG_PCT")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      }, 
      {
        dataField: 'FG3Mrt',
        text: '3PTM',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("FG3M")?"bold":"normal"),color: (focus.includes("FG3M")?(aob(cell,"FG3M")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
      {
        dataField: 'FT_PCTrt',
        text: 'FT%',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("FT_PCT")?"bold":"normal"),color: (focus.includes("FT_PCT")?(aob(cell,"FT_PCT")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
      {
        dataField: 'REBrt',
        text: 'REB',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("REB")?"bold":"normal"),color: (focus.includes("REB")?(aob(cell,"REB")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
      {
        dataField: 'ASTrt',
        text: 'AST',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("AST")?"bold":"normal"),color: (focus.includes("AST")?(aob(cell,"AST")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
      {
        dataField: 'STLrt',
        text: 'STL',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("STL")?"bold":"normal"),color: (focus.includes("STL")?(aob(cell,"STL")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
      {
        dataField: 'BLKrt',
        text: 'BLK',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("BLK")?"bold":"normal"),color: (focus.includes("BLK")?(aob(cell,"BLK")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
      {
        dataField: 'TOVrt',
        text: 'TOV',
        sort: true,
        formatter: (cell, row) => {
          return (    
            <div>
              <span key={row.Player_Name} style={{fontWeight:(focus.includes("TOV")?"bold":"normal"),color: (focus.includes("TOV")?(aob(cell,"TOV")):"black")}}>
                  {cell}
              </span>
            </div>
          )
        }
      },
    ]

    const handleChange = (event) => {    
        setView(event)
    }

    const aob = (v,c) => {
        if(c==="FG_PCT" || c==="FT_PCT"){
           if(v < -.5){
              return "darkred";
           }
           else if(v >= -.5 && v < 0){
              return "red";
           }
           else if(v < .5 && v >= 0){
              return "olive";
           }
           else if(v >= .5){
            return "darkgreen";
           }
        }
        else{
          if(v < -3){
              return "darkred";
          }
          else if(v >= -3 && v < 0){
              return "red";
          }
          else if(v < 3 && v >= 0){
              return "olive";
          }
          else if(v >= 3){
            return "darkgreen";
          }
        }
    } 
    
    const fits = rp.reduce((p, c) => {
        let ft = focus.reduce((prev, cur) => {if(c[cur+"rt"]>2){prev.push(cur);return prev}return prev},[]);
        c.focused = ft;
        if(ft.length > 3){
            p.great.push(c);
            return p;
        }
        else if((ft.length > 1) && (ft.length<=3)){
            p.good.push(c);
            return p;
        }
        else if(ft.length === 1 && (c[ft[0] + "rt"] > 7)){
            p.specialist.push(c);
            return p;
        }
        return p;
    }, {great:[],good:[],specialist:[]});


    

    return (
      <div>
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Suggested Stats to Focus on</th>
              {fpres.map((item,index) => (
                <th key={item}>{item}</th>
              ))}
            </tr>
          </thead>
        </table>
        <br/>
        
        <h3>Players to target</h3>
        <ToggleButtonGroup type="radio" name="options" defaultValue="hide" onChange={handleChange}>
          <ToggleButton value="great" style={{padding: "5px",border: "black 1px solid"}}>Great</ToggleButton>
          <ToggleButton value="good" style={{padding: "5px", border: "black 1px solid"}}>Good</ToggleButton>
          <ToggleButton value="specialist" style={{padding: "5px", border: "black 1px solid"}}>Specialist</ToggleButton>
          <ToggleButton value="hide" style={{padding: "5px", border: "black 1px solid"}}>Hide</ToggleButton>
        </ToggleButtonGroup>
        
        <div className={view !== "great" ? 'hidden' : ''}>
            {fits.great ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ fits.great } 
              columns={ rtcolumns }
              pagination={ paginationFactory() }/>
              :<h5>No players are great fits</h5>
            }
        </div>

        <div className={view !== "good" ? 'hidden' : ''}>
            {fits.great ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ fits.good } 
              columns={ rtcolumns }
              pagination={ paginationFactory() }/>
              :<h5>No players are good fits</h5>
            }
        </div>

        <div className={view !== "specialist" ? 'hidden' : ''}>
            {fits.great ?
              <BootstrapTable 
              striped
              hover
              keyField='id' 
              data={ fits.specialist } 
              columns={ rtcolumns }
              pagination={ paginationFactory() }/>
              :<h5>No players are specialist fits</h5>
            }
        </div>
      </div>
      
    );

  }
  

  export default RecPlayers;
  
