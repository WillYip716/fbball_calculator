import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link,useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Button } from "react-bootstrap";


function NavbarComp(){

    const teams = useSelector(state => state.comp.teams)
    const location = useLocation();

    const info = () => {  
        let input = location.pathname.substring(1);
        if(input.indexOf("team")>-1){
            input = "team";
        }
        switch(input) {
            case 'compile':
                return 'Head over to the rosters page under the "league" drop down in your league. Simply copy all the content (ctrl + a => ctrl + c) and paste into the box below';
            case 'trade':
                return "Pick a rostered player on the left panel. The site will grab the team of the player that's rostered to so that you can add more players to trade away. The right panel will be populated with all the remaining players from the FA pool and other rosters. Click the Trade button to finalize at least one player is added to each panel. The color coding denotes an estimate on how how much your stats will increase or decrease relative to other teams based on the trade.";
            case 'rankings':
                return '"Team Average" tab shows the combined per game average of the roster.\n"Team Total Ratings" is the combined ratings for the roster.\n"Team Ranks" is the teams stats ranking relative to other teams in the league where 1 is the best and 12 is the worst in a particular category. The total for "Team Ranks" is just the total of all the ranks which basically means the lower the number the better the team is overall.';
            case 'rosters':
                return "This page lists all the teams and there rosters and is a quick way to look up which player is rostered to which team";
            case 'team':
                return 'The "Team Summary" table gives a quick overview of the team. In the "Totals" column for the team summary table, the lower the better for "Team Avg Rank" and the higher the better for "Total Team Rating".\n"Advanced Analysis" will give recommendations for a given team. Focus stats are stats that the team ranks highly in and based on those stats there will be recommendations for "Perfect","Great","Good", and "Specialist" players that have varying amount of stats that match the team. "Players to trade away" are players that may not match well enough with the team.\nThe "Roster" panel will show the players currently rostered on the team and can toggle between avgs and ratings and also allows filtering for stats.' ;
            default:
                return "Toggle between avg and ratings to change the settings for the tables. Under ratings, you can filter out categories to calculate based on desired stats. The different positions toggle not only the players but give a relative rating based on all rostered players for that position. IE, a center will have higher assists ratings when filtered against other centers because the averages for the group would be lower.";
        }
    }

    const infotitle = () => {  
        let input = location.pathname.substring(1);
        if(input.indexOf("team")>-1){
            input = "team";
        }
        switch(input) {
            case 'compile':
                return 'Compile League';
            case 'trade':
                return "Trade";
            case 'rankings':
                return "Rankings";
            case 'rosters':
                return "Rosters";
            case 'team':
                return "Team";
            default:
                return 'Fantasy Football Calculator';
        }
    }

    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">{infotitle()}</Popover.Title>
          <Popover.Content>
                {info().split("\n").map((item,index) => (
                    <p key={"info" + index}>{item}</p>
                ))}
          </Popover.Content>
        </Popover>
    );

    //<a href="/" onClick={info} style={{color:"white",fontSize:"1.5rem"}}>&#9432;</a> 
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">Fantasy Basketball Calculator</Navbar.Brand>
            <Nav style={{marginRight:"auto"}}>
                <NavDropdown title="Rosters" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/rosters">All</NavDropdown.Item>
                    {teams ?
                        teams.map((item,index) => (
                            <NavDropdown.Item as={Link} to={"/team/" + index} key={item.teamName}>{item.teamName}</NavDropdown.Item>
                        ))
                        :<div>no teams compiled</div>
                    }
                </NavDropdown>
                <Nav.Link as={Link} to="/trade">Trade</Nav.Link>
                <Nav.Link as={Link} to="/rankings">Rankings</Nav.Link>
                <Nav.Link as={Link} to="/compile">Compile</Nav.Link>
            </Nav>
            <Nav>    
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                    <Button className="info">&#9432;</Button>
                </OverlayTrigger>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
        </Navbar>

    )
}

export default NavbarComp;