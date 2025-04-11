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
const EsploraComponent = () => {
  const [itinerari, setItinerari] = useState([]);

  useEffect(() => {
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

    fetchItinerari();
  }, []);

  return (
    <Container fluid className="mt-4 pb-5 mb-5">
      <Row className="justify-content-end mt-5 pt-5">
        <Col xs={12} md={6} lg={4}>
          <Form>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Cerca..."
                aria-label="Cerca"
                className="search-input"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      {itinerari.map((itinerario, index) => {
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
          <Row key={index} className="pt-4">
            <div className="d-flex justify-content-between align-content-center mb-3">
              <h4>{itinerario.paese.nome}</h4>
              <div>
                <a>Scopri di più</a>
                <i className="bi bi-chevron-right ms-1"></i>
              </div>
            </div>

            <Col className="p-2" xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Tab.Container
                  id={`card-tabs-${index}`}
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
                    src={itinerario.immagineUrl ?? "/public/images/thai.jpg"}
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
                        <Link to={`/itinerario/${itinerario.idItinerario}`}>
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
                        <p>Durata: {itinerario.durata}giorni</p>
                        <Link to={`/itinerario/${itinerario.idItinerario}`}>
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
                        <p>Durata: {itinerario.durata}giorni</p>
                        <Link to={`/itinerario/${itinerario.idItinerario}`}>
                          Scopri di più
                        </Link>
                      </Card.Body>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};
export default EsploraComponent;
