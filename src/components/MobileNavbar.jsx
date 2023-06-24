import React from 'react';
import {Nav, Navbar } from 'react-bootstrap';

const MobileNavbar = () => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Navbar expand="sm" className='navbar-dashboard' style={{backgroundColor:'#2D4356'}}>
      <Navbar.Toggle aria-controls="myNavbar" style={{backgroundColor:'white', margin: 5}} onClick={handleToggle} />
      <Navbar.Collapse id="myNavbar" in={open}>
        <Nav className="m-2">
          <Nav.Link  style={{color: 'white', fontWeight: 'bold'}} href="#" className="active">Dashboard</Nav.Link>
          <Nav.Link style={{color: 'white', fontWeight: 'bold'}} href="#">Age</Nav.Link>
          <Nav.Link style={{color: 'white', fontWeight: 'bold'}} href="#">Gender</Nav.Link>
          <Nav.Link style={{color: 'white', fontWeight: 'bold'}}href="#">Geo</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MobileNavbar;