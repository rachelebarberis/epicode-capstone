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
  const [searchQuery, setSearchQuery] = useState(""); // Stato per la ricerca

  // Funzione per recuperare gli itinerari
  const fetchItinerari = async () => {
    try {
      const response = await fetch("https://localhost:7007/api/Itinerario");
      if (!response.ok) {
        throw new Error("Errore durante il recupero degli itinerari");
      }
      const data = await response.json();
      console.log(data);
      setItinerari(data);
    } catch (error) {
      console.error("Errore:", error.message);
    }
  };

  useEffect(() => {
    fetchItinerari();
  }, []);

  // Raggruppa gli itinerari per paese
  const itinerariPerPaese = itinerari.reduce((acc, itinerario) => {
    const paese = itinerario.paese.nome;
    if (!acc[paese]) {
      acc[paese] = [];
    }
    acc[paese].push(itinerario);
    return acc;
  }, {});

  // Funzione per gestire il cambio della ricerca
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtra gli itinerari in base al paese
  const filteredItinerari = Object.keys(itinerariPerPaese)
    .filter(
      (paese) => paese.toLowerCase().includes(searchQuery.toLowerCase()) // Filtra per paese
    )
    .reduce((acc, paese) => {
      acc[paese] = itinerariPerPaese[paese];
      return acc;
    }, {});

  return (
    <Container fluid className="mt-4 pb-5 mb-5">
      <Row className="justify-content-end mt-5 pt-5">
        <Col xs={12} md={6} lg={4}>
          <Form>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Cerca per paese..."
                aria-label="Cerca"
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange} // Gestisci il cambio nella ricerca
              />
              <Button variant="outline-secondary" id="button-addon2">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
        </Col>
        <Button variant="success" onClick={() => setShowCreateModal(true)}>
          Aggiungi Itinerario
        </Button>

        {/* MODAL CORRETTO */}
        <CreateItinerarioModal
          show={showCreateModal}
          handleClose={() => setShowCreateModal(false)}
          onCreated={() => {
            fetchItinerari(); // aggiorna la lista
            setShowCreateModal(false); // chiude il modal
          }}
        />
      </Row>

      {/* Rendering degli itinerari raggruppati per paese */}
      {Object.keys(filteredItinerari).length === 0 ? (
        <p>Nessun itinerario trovato per il paese cercato.</p>
      ) : (
        Object.keys(filteredItinerari).map((paese, index) => {
          const itinerariDelPaese = filteredItinerari[paese];

          return (
            <Row key={index} className="pt-4">
              <div className="d-flex justify-content-between align-content-center mb-3">
                <h4>{paese}</h4>
                <div>
                  <a>Scopri di più</a>
                  <i className="bi bi-chevron-right ms-1"></i>
                </div>
              </div>

              {itinerariDelPaese.map((itinerario, idx) => {
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
                  <Col key={idx} className="p-2" xs={12} sm={6} md={4} lg={3}>
                    <Card>
                      <Tab.Container
                        id={`card-tabs-${idx}`}
                        defaultActiveKey="first"
                      >
                        <Nav
                          variant="pills"
                          className="flex-row justify-content-center"
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

                        <Card.Img
                          variant="top"
                          src={
                            itinerario.immagineUrl ?? "/public/images/thai.jpg"
                          }
                        />

                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                            <Card.Body>
                              <Card.Title className="text-center">
                                {itinerario.paese.nome}
                              </Card.Title>
                              <p>{itinerario.nomeItinerario}</p>
                              <p>Prezzo: {prezzoBase}</p>
                              <p>Durata: {itinerario.durata} giorni</p>
                              <Link
                                to={`/itinerario/${itinerario.idItinerario}`}
                              >
                                Scopri di più
                              </Link>
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <Card.Body>
                              <Card.Title className="text-center">
                                {itinerario.paese.nome}
                              </Card.Title>
                              <p>
                                Cultura, tradizioni e storia di{" "}
                                {itinerario.paese.nome}.
                              </p>
                              <p>Prezzo: {prezzoMedio}</p>
                              <p>Durata: {itinerario.durata} giorni</p>
                              <Link
                                to={`/itinerario/${itinerario.idItinerario}`}
                              >
                                Scopri di più
                              </Link>
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="third">
                            <Card.Body>
                              <Card.Title className="text-center">
                                {itinerario.paese.nome}
                              </Card.Title>
                              <p>
                                Principali attrazioni turistiche di{" "}
                                {itinerario.paese.nome}.
                              </p>
                              <p>Prezzo: {prezzoTop}</p>
                              <p>Durata: {itinerario.durata} giorni</p>
                              <Link
                                to={`/itinerario/${itinerario.idItinerario}`}
                              >
                                Scopri di più
                              </Link>
                            </Card.Body>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        })
      )}
    </Container>
  );
};

export default EsploraComponent;
