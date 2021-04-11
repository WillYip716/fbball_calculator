import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';


function NavbarComp(){
    
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Fantasy Basketball Calculator</Navbar.Brand>
            <Nav style={{marginRight:"auto"}}>
                <NavDropdown title="Rosters" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/rosters">All</NavDropdown.Item>
                    <NavDropdown.Item href="/team/1">1</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            <Nav>
                <Nav.Link href="/about">About</Nav.Link>
            </Nav>
        </Navbar>

    )
}

export default NavbarComp;