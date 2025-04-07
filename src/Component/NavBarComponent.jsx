import { Container, Nav, Navbar } from "react-bootstrap";
const NavBarComponent = () => {
  return (
    <Navbar expand="md" className=" pt-0" id="navbar">
      <Container fluid={true}>
        <Nav.Link to="/" className="m-0 p-0">
          <img src="/public/images/logo.jpg" id="imglogo" />
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="me-auto">
            <Nav.Link>Esplora</Nav.Link>
            <Nav.Link>About Us</Nav.Link>

            <Nav.Link>Area Personale</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link className="nav-Nav.Link justify-content-end">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarComponent;
