import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/authActions";

const NavBarComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
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
            <>
              <Link to="/Esplora" className=" nav-link">
                Itinerari
              </Link>
              <Link to="/AboutUs" className=" nav-link">
                About Us
              </Link>
              <Link to="/Recensioni" className=" nav-link">
                Recensioni
              </Link>
            </>
            <Link to="/Paese" className="nav-link">
              Paesi
            </Link>

            {isAuthenticated && userRole === "User" && (
              <Link to="/AreaPersonale" className=" nav-link">
                Area Personale
              </Link>
            )}
          </Nav>

          <Nav>
            {!isAuthenticated && (
              <Link
                to="/Login"
                onClick={() => dispatch(logout())}
                className="nav-link text-danger"
              >
                Login
              </Link>
            )}
            {isAuthenticated && (
              <>
                <Link to="/Carrello" className=" nav-link">
                  <i className="bi bi-cart"></i>
                </Link>
                <Link to="/" className=" nav-link">
                  Logout
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBarComponent;
