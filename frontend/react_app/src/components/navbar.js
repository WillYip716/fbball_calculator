import React,{ useState, useEffect } from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import axios from 'axios';

function NavbarComp(){

    const [teams, setTeams] = useState([]);

    useEffect(()=>{
        async function fetchdata(){
            
            axios.get('/teams/')
            .then(res => {
                const rosters = res.data;
                setTeams(rosters);
            })
        }
        fetchdata();
    },[])
    
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Fantasy Basketball Calculator</Navbar.Brand>
            <Nav style={{marginRight:"auto"}}>
                <NavDropdown title="Rosters" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/rosters">All</NavDropdown.Item>
                    {teams.map(item => (
                        <NavDropdown.Item href={"/team/" + item.teamid} key={item.team}>{item.team}</NavDropdown.Item>
                    ))}
                </NavDropdown>
                <Nav.Link href="/rankings">Rankings</Nav.Link>
            </Nav>
            <Nav>    
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </Navbar>

    )
}

export default NavbarComp;