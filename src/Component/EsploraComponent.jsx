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
import { Link } from "react-router-dom";
import CreateItinerarioModal from "./ItinerarioAdmin/CreateItinerarioModal";

const EsploraComponent = () => {
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
      <Row className="justify-content-between align-items-center mb-4">
        <Col xs={12} md={6} lg={4}>
          <Form>
            <InputGroup>
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

        <Col xs="auto" className="mt-3 mt-md-0">
          <Button variant="success" onClick={() => setShowCreateModal(true)}>
            + Aggiungi Itinerario
          </Button>
        </Col>
      </Row>

      <CreateItinerarioModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        onCreated={() => {
          fetchItinerari();
          setShowCreateModal(false);
        }}
      />

      {Object.keys(filteredItinerari).length === 0 ? (
        <p className="text-muted text-center">Nessun itinerario trovato.</p>
      ) : (
        Object.entries(filteredItinerari).map(([paese, lista], index) => (
          <div key={index} className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold mb-0">{paese}</h4>
              <div className="text-success cursor-pointer">
                <span>Scopri di più</span>
                <i className="bi bi-chevron-right ms-1"></i>
              </div>
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

                          <Tab.Content className="p-3">
                            <Tab.Pane eventKey="first">
                              <Card.Title>
                                {itinerario.nomeItinerario}
                              </Card.Title>
                              <p>Prezzo: {prezzoBase ?? "N/D"}</p>
                              <p>Durata: {itinerario.durata} giorni</p>
                              <Link
                                to={`/itinerario/${itinerario.idItinerario}`}
                                className="btn btn-outline-success btn-sm"
                              >
                                Scopri di più
                              </Link>
                            </Tab.Pane>

                            <Tab.Pane eventKey="second">
                              <Card.Title>
                                {itinerario.nomeItinerario}
                              </Card.Title>
                              <p>Prezzo: {prezzoMedio ?? "N/D"}</p>
                              <p>Durata: {itinerario.durata} giorni</p>
                              <Link
                                to={`/itinerario/${itinerario.idItinerario}`}
                                className="btn btn-outline-success btn-sm"
                              >
                                Scopri di più
                              </Link>
                            </Tab.Pane>

                            <Tab.Pane eventKey="third">
                              <Card.Title>
                                {itinerario.nomeItinerario}
                              </Card.Title>
                              <p>Prezzo: {prezzoTop ?? "N/D"}</p>
                              <p>Durata: {itinerario.durata} giorni</p>
                              <Link
                                to={`/itinerario/${itinerario.idItinerario}`}
                                className="btn btn-outline-success btn-sm"
                              >
                                Scopri di più
                              </Link>
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
