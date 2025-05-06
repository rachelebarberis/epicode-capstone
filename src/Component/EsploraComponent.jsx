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
import { getItinerari } from "../Redux/Actions/itinerarioActions";

const EsploraComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  const [itinerari, setItinerari] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getItinerari();
        setItinerari(data);
      } catch (error) {
        console.error("Errore nel caricamento degli itinerari:", error.message);
      }
    };
    fetchData();
  }, []);

  const itinerariPerPaese = itinerari.reduce((acc, itinerario) => {
    const paese = itinerario.paese.nome;
    if (!acc[paese]) acc[paese] = [];
    acc[paese].push(itinerario);
    return acc;
  }, {});

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredItinerari = Object.keys(itinerariPerPaese)
    .filter((paese) => paese.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort()
    .reduce((acc, paese) => {
      acc[paese] = itinerariPerPaese[paese].slice(0, 4);
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
        <Row className="justify-content-end mb-4">
          <Col xs="auto">
            <Button variant="success" onClick={() => setShowCreateModal(true)}>
              Aggiungi itinerario
            </Button>
          </Col>
        </Row>
      )}

      <CreateItinerarioModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        onCreated={() => {
          setShowCreateModal(false);
          window.location.reload();
        }}
      />

      {Object.keys(filteredItinerari).length === 0 ? (
        <p className="text-muted text-center">Nessun itinerario trovato.</p>
      ) : (
        Object.entries(filteredItinerari).map(([paese, lista], index) => (
          <div key={index} className="mb-5">
            <h4 id="titolo-paese" className="fw-bold text-center mb-2">
              {paese}
            </h4>
            <div className="text-center mb-3">
              <Link to={`/paese/${paese}`} className="link-itinerari">
                Scopri tutti gli itinerari su: <strong>{paese}</strong>
              </Link>
            </div>

            <Row>
              {lista.map((itinerario, idx) => {
                const prezzi = {
                  base: itinerario.itinerarioFascePrezzo.find(
                    (f) => f.idFasciaDiPrezzo === 1
                  )?.prezzo,
                  medio: itinerario.itinerarioFascePrezzo.find(
                    (f) => f.idFasciaDiPrezzo === 2
                  )?.prezzo,
                  top: itinerario.itinerarioFascePrezzo.find(
                    (f) => f.idFasciaDiPrezzo === 3
                  )?.prezzo,
                };

                return (
                  <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="h-100 shadow-sm border-0 card-itinerario">
                      <Tab.Container defaultActiveKey="first">
                        <>
                          <Card.Img
                            variant="top"
                            src={itinerario.immagineUrl || "/images/thai.jpg"}
                            className="img-itinerario"
                          />

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
                            {["first", "second", "third"].map((key, i) => {
                              const prezzo = Object.values(prezzi)[i];
                              return (
                                <Tab.Pane eventKey={key} key={key}>
                                  <Card.Body className="text-center">
                                    <Card.Title className="fw-bold mb-2 titolo-itinerario">
                                      {itinerario.nomeItinerario}
                                    </Card.Title>
                                    <p className="mb-1 prezzo-itinerario">
                                      Prezzo: {prezzo ?? "N/D"}
                                    </p>
                                    <p className="text-muted mb-3 durata-itinerario">
                                      Durata: {itinerario.durata} giorni
                                    </p>
                                    <Link
                                      to={`/itinerario/${itinerario.idItinerario}`}
                                      className="btn rounded-pill fw-bold px-4 btn-scopri"
                                    >
                                      <i className="bi bi-compass-fill me-2" />
                                      Scopri di più
                                    </Link>
                                  </Card.Body>
                                </Tab.Pane>
                              );
                            })}
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
