import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'


function NavbarComp(){

    const teams = useSelector(state => state.comp.rankings.avg)
    
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">Fantasy Basketball Calculator</Navbar.Brand>
            <Nav style={{marginRight:"auto"}}>
                <NavDropdown title="Rosters" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/rosters">All</NavDropdown.Item>
                    {teams ?
                        teams.map(item => (
                            <NavDropdown.Item as={Link} to={"/team/" + item.team} key={item.team}>{item.team}</NavDropdown.Item>
                        ))
                        :<div>no teams compiled</div>
                    }
                </NavDropdown>
                <Nav.Link as={Link} to="/rankings">Rankings</Nav.Link>
                <Nav.Link as={Link} to="/ratings">Ratings</Nav.Link>
                <Nav.Link as={Link} to="/compile">Compile</Nav.Link>
            </Nav>
            <Nav>    
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </Navbar>

    )
}

export default NavbarComp;