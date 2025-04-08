import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const NavBarComponent = () => {
  return (
    <Navbar expand="md" className=" pt-0" id="navbar">
      <Container fluid={true}>
        <Link to="/" className="m-0 p-0 nav-link">
          <img src="/public/images/logo.jpg" id="imglogo" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="me-auto">
            <Link to="/Esplora" className=" nav-link">
              Esplora
            </Link>
            <Link to="/AboutUs" className=" nav-link">
              About Us
            </Link>
            <Link to="/Recensioni" className=" nav-link">
              Recensioni
            </Link>

            <Link to="/AreaPersonale" className=" nav-link">
              Area Personale
            </Link>
          </Nav>

          <Nav>
            <Link to="/Carrello" className=" nav-link">
              <i className="bi bi-cart"></i>
            </Link>
            <Link to="/Login" className=" nav-link">
              Login
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarComponent;
