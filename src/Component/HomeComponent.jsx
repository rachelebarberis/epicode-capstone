import { Container, Card, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getRecensione } from "../Redux/Actions/recensioneAction";

const HomeComponent = () => {
  const [itinerari, setItinerari] = useState([]);
  const [recensioni, setRecensioni] = useState([]); // Stato per le recensioni

  useEffect(() => {
    const fetchItinerari = async () => {
      try {
        const response = await fetch("https://localhost:7007/api/Itinerario");
        if (!response.ok) {
          throw new Error("Errore durante il recupero degli itinerari");
        }
        const data = await response.json();
        setItinerari(data);
      } catch (error) {
        console.error("Errore:", error.message);
      }
    };

    const fetchRecensioni = async () => {
      try {
        const data = await getRecensione(); // Chiamata alla funzione getRecensione
        setRecensioni(data); // Memorizza le recensioni nello stato
      } catch (error) {
        console.error("Errore nel recupero delle recensioni:", error.message);
      }
    };

    fetchItinerari();
    fetchRecensioni();
  }, []);

  // Suddividere gli itinerari in gruppi di 4 per il carosello
  const chunkSize = 4;
  const chunkedItinerari = [];
  for (let i = 0; i < itinerari.length; i += chunkSize) {
    chunkedItinerari.push(itinerari.slice(i, i + chunkSize));
  }

  // Suddividere le recensioni in gruppi di 4 per il carosello
  const chunkedRecensioni = [];
  for (let i = 0; i < recensioni.length; i += chunkSize) {
    chunkedRecensioni.push(recensioni.slice(i, i + chunkSize));
  }

  return (
    <Container className="pb-5 mb-5 pt-5 pb-5">
      <div
        style={{
          backgroundImage: "url('/images/banner.jpg')",
          backgroundSize: "cover", // fa coprire tutto il div
          backgroundPosition: "center", // centra l'immagine
          backgroundRepeat: "no-repeat",
          minHeight: "400px", // altezza minima
          width: "100%",
        }}
      ></div>
      <div className="d-flex flex-column justify-content-center align-items-center mt-lg-5 text-center p-5">
        <h1
          className="mb-3 mt-3"
          style={{ fontWeight: "800", color: "#532c09", fontSize: "3rem" }}
        >
          WanderLOst
        </h1>
        <h2 style={{ color: "#7A3E1F", fontWeight: "600", fontSize: "1.8rem" }}>
          Perditi nelle meraviglie del mondo!
        </h2>

        <hr className="w-25 my-4" style={{ borderTop: "3px solid #7A3E1F" }} />

        <blockquote className="blockquote text-center">
          <p
            className="mb-0"
            style={{ fontStyle: "italic", fontSize: "1.2rem" }}
          >
            "Viaggiare ti lascia senza parole, poi ti trasforma in un
            narratore."
          </p>
          <footer
            className="blockquote-footer pt-3"
            style={{ color: "#532c09", fontWeight: "bold" }}
          >
            Ibn Battuta
          </footer>
        </blockquote>

        <hr className="w-50 my-4" style={{ borderTop: "2px solid #7A3E1F" }} />
      </div>

      <section className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Esplora</h4>
          <div>
            <a>Scopri di più</a>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>

        {/* Carosello per gli itinerari */}
        <Carousel indicators={false}>
          {chunkedItinerari.map((chunk, index) => (
            <Carousel.Item key={index}>
              <Row className="d-flex justify-content-center">
                {chunk.map((itinerario) => (
                  <Col
                    className="p-3"
                    xs={12} // Per schermi molto piccoli (1 colonna)
                    sm={6} // Su dispositivi piccoli (2 colonne)
                    md={6} // Su dispositivi medi (3 colonne)
                    lg={3}
                    key={itinerario.idItinerario}
                  >
                    <Card
                      style={{
                        width: "250px",
                        height: "300px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      className="hover-card"
                    >
                      <Card.Img
                        variant="top"
                        src={
                          itinerario.immagineUrl || "/public/images/default.jpg"
                        }
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                      />
                      <Card.Body>
                        <Card.Title
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          {itinerario.nomeItinerario}
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <hr className="w-100 m-4" style={{ color: "#7A3E1F" }} />
      <section className="mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h4>Recensioni</h4>
          <div>
            <a>Scopri di più</a>
            <i className="bi bi-chevron-right"></i>
          </div>
        </div>

        {/* Carosello delle recensioni */}
        <Carousel indicators={false}>
          {chunkedRecensioni.map((chunk, index) => (
            <Carousel.Item key={index}>
              <Row className="d-flex justify-content-center">
                {chunk.map((recensione, index) => (
                  <Col xs={12} sm={6} md={4} lg={3} className="p-3" key={index}>
                    <Card
                      style={{
                        width: "100%",
                        maxWidth: "280px",
                        minHeight: "340px",
                        borderRadius: "20px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        border: "none",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        background: "#fff",
                      }}
                      className="hover-card p-1 pt-5"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                          "0 12px 32px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 24px rgba(0,0,0,0.08)";
                      }}
                    >
                      <div className="d-flex justify-content-center mb-3">
                        <div
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            border: "3px solid #7A3E1F",
                            overflow: "hidden",
                          }}
                        >
                          {recensione.imgUserPath ? (
                            <img
                              src={`https://localhost:7007/${recensione.imgUserPath}`}
                              alt={recensione.nomeUtente}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              className="bg-secondary text-white d-flex align-items-center justify-content-center"
                              style={{
                                width: "100%",
                                height: "100%",
                                fontSize: "1.5rem",
                              }}
                            >
                              N/A
                            </div>
                          )}
                        </div>
                      </div>

                      <Card.Body className="text-center p-0">
                        <h5 className="fw-bold mb-1">
                          {recensione.nomeUtente}
                        </h5>
                        <small className="text-muted d-block mb-2">
                          {recensione.createdAt
                            ? new Date(
                                recensione.createdAt
                              ).toLocaleDateString()
                            : "Data non disponibile"}
                        </small>

                        <h6
                          className="text-primary mb-2"
                          style={{ fontSize: "1rem" }}
                        >
                          {recensione.titoloItinerario}
                        </h6>

                        <p
                          className="text-secondary small mb-0 p-0"
                          style={{ minHeight: "50px" }}
                        >
                          {recensione.commento.length > 100
                            ? `${recensione.commento.substring(0, 100)}...`
                            : recensione.commento}
                        </p>

                        <div className="text-warning">
                          {"⭐".repeat(Math.round(recensione.valutazione))}
                          {"☆".repeat(5 - Math.round(recensione.valutazione))}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      <hr className="w-100 m-4" style={{ color: "#7A3E1F" }} />

      <section className="mt-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h4>About Us</h4>
          <p className="text-center">
            Siamo un team di appassionati viaggiatori pronti a guidarti verso le
            migliori esperienze del mondo.
            <br />
            Scopri di più sulla nostra missione e sul nostro team!
          </p>
          <Link to="/AboutUs" className="nav-link">
            <p>Scopri di più</p>
          </Link>
        </div>
      </section>

      <hr className="w-100 m-4 " style={{ color: "#7A3E1F" }} />
    </Container>
  );
};

export default HomeComponent;
