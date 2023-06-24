import {Nav, Navbar } from 'react-bootstrap';

const MenuMobile = () => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Navbar expand="sm">
      <Navbar.Toggle aria-controls="myNavbar" onClick={handleToggle} />
      <Navbar.Collapse id="myNavbar" in={open}>
        <Nav className="mr-auto menu-mobile">
          <Nav.Link href="#" className="active">Dashboard</Nav.Link>
          <Nav.Link href="#">Age</Nav.Link>
          <Nav.Link href="#">Gender</Nav.Link>
          <Nav.Link href="#">Geo</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MenuMobile;