import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Card,
  Tab,
  Nav,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateItinerarioModal from "./ItinerarioAdmin/CreateItinerarioModal";

const EsploraComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const [itinerari, setItinerari] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchItinerari = async () => {
    try {
      const response = await fetch("https://localhost:7007/api/Itinerario");
      if (!response.ok) throw new Error("Errore nel recupero itinerari");
      const data = await response.json();
      setItinerari(data);
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  useEffect(() => {
    fetchItinerari();
  }, []);

  const itinerariPerPaese = itinerari.reduce((acc, itinerario) => {
    const paese = itinerario.paese.nome;
    if (!acc[paese]) acc[paese] = [];
    acc[paese].push(itinerario);
    return acc;
  }, {});

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItinerari = Object.keys(itinerariPerPaese)
    .filter((paese) => paese.toLowerCase().includes(searchQuery.toLowerCase()))
    .reduce((acc, paese) => {
      acc[paese] = itinerariPerPaese[paese];
      return acc;
    }, {});

  return (
    <Container fluid className="pt-5 mt-5 px-4">
      <Row className="justify-content-end mb-4">
        <Col xs={12} md={6} lg={4}>
          <Form>
            <InputGroup className="search-bar">
              <Form.Control
                type="text"
                placeholder="Cerca per paese..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search" />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {isAuthenticated && userRole === "Admin" && (
        <Row className="justify-content-center">
          <Col xs="auto" className="mt-3 mt-md-0">
            <Button variant="success" onClick={() => setShowCreateModal(true)}>
              <i className="bi bi-plus"></i>
            </Button>
          </Col>
        </Row>
      )}

      <CreateItinerarioModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        onCreated={() => {
          fetchItinerari();
          setShowCreateModal(false);
        }}
      />

      {/* Mostra itinerari o messaggio quando non ci sono risultati */}
      {Object.keys(filteredItinerari).length === 0 ? (
        <p className="text-muted text-center">Nessun itinerario trovato.</p>
      ) : (
        Object.entries(filteredItinerari).map(([paese, lista], index) => (
          <div key={index} className="mb-5">
            <div className="d-flex justify-content-center align-items-center mb-2">
              <h4
                className="fw-bold mb-0"
                style={{ textAlign: "center", color: "#FF5722" }}
              >
                {paese}
              </h4>
            </div>
            <div className="d-flex justify-content-center mt-0 mb-3">
              <Link
                to={`/paese/${paese}`}
                className="text-dark text-decoration-none"
              >
                Vai agli itinerari
              </Link>
            </div>

            <Row>
              {lista.map((itinerario, idx) => {
                const prezzoBase = itinerario.itinerarioFascePrezzo.find(
                  (f) => f.idFasciaDiPrezzo === 1
                )?.prezzo;
                const prezzoMedio = itinerario.itinerarioFascePrezzo.find(
                  (f) => f.idFasciaDiPrezzo === 2
                )?.prezzo;
                const prezzoTop = itinerario.itinerarioFascePrezzo.find(
                  (f) => f.idFasciaDiPrezzo === 3
                )?.prezzo;

                return (
                  <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="h-100 shadow-sm border-0 hover-shadow transition">
                      <Tab.Container defaultActiveKey="first">
                        <>
                          <Card.Img
                            variant="top"
                            src={itinerario.immagineUrl || "/images/thai.jpg"}
                            style={{ height: "180px", objectFit: "cover" }}
                          />

                          {/* Tab per i prezzi */}
                          <Nav
                            variant="pills"
                            className="justify-content-center mt-2"
                          >
                            <Nav.Item>
                              <Nav.Link eventKey="first">€</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="second">€€</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="third">€€€</Nav.Link>
                            </Nav.Item>
                          </Nav>

                          <Tab.Content>
                            <Tab.Pane eventKey="first">
                              <Card.Body className="text-center">
                                <Card.Title
                                  className="fw-bold mb-2"
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#FF5722",
                                  }}
                                >
                                  {itinerario.nomeItinerario}
                                </Card.Title>
                                <p
                                  className="mb-1"
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    color: "orangered",
                                  }}
                                >
                                  Prezzo: {prezzoBase ?? "N/D"}
                                </p>
                                <p
                                  className="text-muted mb-3"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  Durata: {itinerario.durata} giorni
                                </p>
                                <Link
                                  to={`/itinerario/${itinerario.idItinerario}`}
                                  className="btn rounded-pill fw-bold px-4"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, orangered, #FF5722)",
                                    color: "white",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(255,87,34,0.4)",
                                    transition: "all 0.3s ease-in-out",
                                  }}
                                >
                                  <i className="bi bi-compass-fill me-2"></i>
                                  Scopri di più
                                </Link>
                              </Card.Body>
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">
                              <Card.Body className="text-center">
                                <Card.Title
                                  className="fw-bold mb-2"
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#FF5722",
                                  }}
                                >
                                  {itinerario.nomeItinerario}
                                </Card.Title>
                                <p
                                  className="mb-1"
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    color: "orangered",
                                  }}
                                >
                                  Prezzo: {prezzoMedio ?? "N/D"}
                                </p>
                                <p
                                  className="text-muted mb-3"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  Durata: {itinerario.durata} giorni
                                </p>
                                <Link
                                  to={`/itinerario/${itinerario.idItinerario}`}
                                  className="btn rounded-pill fw-bold px-4"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, orangered, #FF5722)",
                                    color: "white",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(255,87,34,0.4)",
                                    transition: "all 0.3s ease-in-out",
                                  }}
                                >
                                  <i className="bi bi-compass-fill me-2"></i>
                                  Scopri di più
                                </Link>
                              </Card.Body>
                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                              <Card.Body className="text-center">
                                <Card.Title
                                  className="fw-bold mb-2"
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#FF5722",
                                  }}
                                >
                                  {itinerario.nomeItinerario}
                                </Card.Title>
                                <p
                                  className="mb-1"
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    color: "orangered",
                                  }}
                                >
                                  Prezzo: {prezzoTop ?? "N/D"}
                                </p>
                                <p
                                  className="text-muted mb-3"
                                  style={{ fontSize: "0.9rem" }}
                                >
                                  Durata: {itinerario.durata} giorni
                                </p>
                                <Link
                                  to={`/itinerario/${itinerario.idItinerario}`}
                                  className="btn rounded-pill fw-bold px-4"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, orangered, #FF5722)",
                                    color: "white",
                                    border: "none",
                                    boxShadow: "0 4px 10px rgba(255,87,34,0.4)",
                                    transition: "all 0.3s ease-in-out",
                                  }}
                                >
                                  <i className="bi bi-compass-fill me-2"></i>
                                  Scopri di più
                                </Link>
                              </Card.Body>
                            </Tab.Pane>
                          </Tab.Content>
                        </>
                      </Tab.Container>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        ))
      )}
    </Container>
  );
};

export default EsploraComponent;
