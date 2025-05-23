import { Container, Carousel, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { getRecensione } from "../Redux/Actions/recensioneAction";
import { getItinerari } from "../Redux/Actions/itinerarioActions";
import ReactPageFlip from "react-pageflip";

const HomeComponent = () => {
  const [itinerari, setItinerari] = useState([]);
  const [recensioni, setRecensioni] = useState([]);
  const bookRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itinerari = await getItinerari();
        setItinerari(itinerari);
      } catch (error) {
        console.error("Errore nel recupero degli itinerari:", error.message);
      }

      try {
        const recensioni = await getRecensione();
        setRecensioni(recensioni);
      } catch (error) {
        console.error("Errore nel recupero delle recensioni:", error.message);
      }
    };

    fetchData();
  }, []);

  const chunkedRecensioni = useMemo(() => {
    const chunks = [];
    const chunkSize = 4;
    for (let i = 0; i < recensioni.length; i += chunkSize) {
      chunks.push(recensioni.slice(i, i + chunkSize));
    }
    return chunks;
  }, [recensioni]);

  const handleNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const handlePrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <Container className="mt-5 pt-5 mb-5 pb-5">
      <div id="hero-div">
        <div id="hero-p"></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 id="h1-home">WanderLOst</h1>
          <h2 id="h2-home">Perditi nelle meraviglie del mondo!</h2>
          <Link to="/Esplora">
            <button id="btn-hero">Inizia a Sognare!</button>
          </Link>
        </div>
      </div>

      <section className="mt-5">
        <h4 className="text-center fw-bold text-black">I nostri itinerari</h4>
        <p className="text-center fw-bold" id="orange" onClick={handleNextPage}>
          Sfoglia il catalogo
        </p>

        <div className="d-flex justify-content-center" id="tour-div">
          <ReactPageFlip
            ref={bookRef}
            width={800}
            height={550}
            size="stretch"
            showCover={true}
            flippingTime={800}
          >
            {itinerari.map((itinerario) => (
              <div id="itinerario" key={itinerario.idItinerario}>
                <img
                  id="itinerario-img"
                  src={itinerario.immagineUrl || "/images/logosito.jpg"}
                  alt={itinerario.nomeItinerario}
                />
                <Link
                  to={`/itinerario/${itinerario.idItinerario}`}
                  id="itinerario-nome"
                >
                  <p className="text-center mt-1 mt-md-3">
                    {itinerario.nomeItinerario}
                  </p>
                </Link>
              </div>
            ))}
          </ReactPageFlip>
        </div>

        <div className="d-flex justify-content-between mt-1">
          <button id="itinerario-btn" onClick={handlePrevPage}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <button id="itinerario-btn" onClick={handleNextPage}>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </section>

      <section className="mt-5">
        <div className="d-flex flex-column align-items-center">
          <h4 className="text-center fw-bold text-black">Recensioni</h4>
          <div>
            <Link to="/Recensioni" className="text-decoration-none">
              <p id="orange" className="fw-bold">
                Leggi tutte le recensioni
              </p>
            </Link>
          </div>
        </div>

        <Carousel indicators={false}>
          {chunkedRecensioni.map((chunk, index) => (
            <Carousel.Item key={index}>
              <Row className="d-flex justify-content-center">
                {chunk.map((recensione, idx) => (
                  <Col xs={12} sm={6} lg={3} className="p-3" key={idx}>
                    <Card
                      id="card-recensioni"
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
                            overflow: "hidden",
                          }}
                        >
                          {recensione.imgUserPath ? (
                            <img
                              id="img-recensioni"
                              src={`https://localhost:7007/${recensione.imgUserPath}`}
                              alt={recensione.nomeUtente}
                            />
                          ) : (
                            <div
                              id="img-recensioni"
                              className="bg-secondary text-white d-flex align-items-center justify-content-center"
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

                        <h6 className=" mb-2" id="orange">
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

                        <div className="pb-3" id="orange">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={
                                i < Math.round(recensione.valutazione)
                                  ? "bi bi-star-fill"
                                  : "bi bi-star"
                              }
                              style={{ marginRight: "2px", fontSize: "1.2rem" }}
                            ></i>
                          ))}
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

      <section id="about-us" className="mt-5">
        <div className="d-flex flex-column justify-content-center align-items-center text-center p-4">
          <h2 id="orange" className="mb-3 fw-bold">
            About Us
          </h2>
          <p className="mb-3">
            Siamo un team di appassionati viaggiatori pronti a guidarti verso le
            migliori esperienze del mondo.
            <br />
            Scopri di più sulla nostra missione e sul nostro team!
          </p>
          <Link to="/AboutUs" className="text-decoration-none">
            <div
              id="homeabout"
              className="d-inline-block"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e55300";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "orangered";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Scopri di più
              <i className="bi bi-chevron-right ms-2"></i>
            </div>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default HomeComponent;
