import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Tab, Nav } from "react-bootstrap";

const ItinerariPaese = () => {
  const { nomePaese } = useParams();
  const [itinerari, setItinerari] = useState([]);

  useEffect(() => {
    const fetchItinerari = async () => {
      try {
        const response = await fetch("https://localhost:7007/api/Itinerario");
        const data = await response.json();
        const filtrati = data.filter(
          (item) => item.paese.nome.toLowerCase() === nomePaese.toLowerCase()
        );
        setItinerari(filtrati);
      } catch (error) {
        console.error("Errore:", error.message);
      }
    };

    fetchItinerari();
  }, [nomePaese]);

  return (
    <Container className="pt-5 mt-5">
      <h2 className="text-center mb-4" style={{ color: "orangered" }}>
        Itinerari in {nomePaese}
      </h2>
      <Row>
        {itinerari.length === 0 ? (
          <p className="text-muted text-center">
            Nessun itinerario disponibile.
          </p>
        ) : (
          itinerari.map((itinerario, idx) => {
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
                <Card className="h-100 shadow-sm border-0">
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

                      <Tab.Content>
                        {["first", "second", "third"].map((key, i) => {
                          const prezzo =
                            i === 0
                              ? prezzoBase
                              : i === 1
                              ? prezzoMedio
                              : prezzoTop;
                          return (
                            <Tab.Pane eventKey={key} key={key}>
                              <Card.Body className="text-center">
                                <Card.Title
                                  className="fw-bold mb-2"
                                  style={{
                                    fontSize: "1.3rem",
                                    color: "#FF5722",
                                  }}
                                >
                                  <Link
                                    to={`/itinerario/${itinerario.idItinerario}`}
                                    style={{
                                      color: "orangered",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {itinerario.nomeItinerario}
                                  </Link>
                                </Card.Title>
                                <p
                                  className="mb-1"
                                  style={{
                                    fontSize: "1rem",
                                    fontWeight: "500",
                                    color: "orangered",
                                  }}
                                >
                                  Prezzo: {prezzo ?? "N/D"}
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
                          );
                        })}
                      </Tab.Content>
                    </>
                  </Tab.Container>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default ItinerariPaese;
