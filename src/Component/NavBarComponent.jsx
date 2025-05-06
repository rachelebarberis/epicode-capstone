import { Nav, Navbar, Container, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/authActions";
import { useState } from "react";

const NavBarComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    navigate("/"); // reindirizza alla home dopo logout
  };

  return (
    <>
      <Navbar expand="lg" className=" p-0" id="navbar">
        <Container fluid={true}>
          <Link to="/" className="m-0 p-0 nav-link">
            <img src="/images/WanderLost.png" id="imglogo" />
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
              <Link to="/Contatti" className="nav-link">
                Contatti
              </Link>

              {isAuthenticated && userRole === "User" && (
                <Link to="/AreaPersonale" className=" nav-link">
                  Area Personale
                </Link>
              )}
            </Nav>

            <Nav>
              {!isAuthenticated && (
                <Link to="/Login" className="nav-link">
                  Login
                </Link>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/Carrello" className=" nav-link">
                    <i className="bi bi-cart"></i>
                  </Link>
                  <Link
                    to="#"
                    className=" nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowLogoutModal(true);
                    }}
                  >
                    Logout
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton id="itinerario-form">
          <Modal.Title className="modal-title">Conferma Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler uscire?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBarComponent;
